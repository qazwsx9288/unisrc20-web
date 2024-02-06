import { defineStore } from "pinia"
import { reactive, ref, computed } from "vue"
import { ethers } from "ethers"
import {
  getSignatureMessage,
  verifySignature,
  verifyAddress,
  verifyWhitelist,
  completeTask,
} from "@/api/server-api.js"
import { contractConfig } from "@/contract/contract.js"
import bus from "vue3-eventbus"
import { getQueryString } from "@/utils/helper.js"
import { ElMessage } from "element-plus"

export const useWeb3Wallet = defineStore("web3Wallet", () => {
  // config
  const RPC_URL = import.meta.env.VITE_BASE_OKX_RPC
  const CHAIN_ID = import.meta.env.VITE_BASE_CHAIN_ID
  const CHAIN_NAME = import.meta.env.VITE_BASE_CHAIN_Name
  const CURRENCY_SYMBOL = import.meta.env.VITE_BASE_CURRENCY_SYMBOL

  // 受支持的walletList
  const supportWalletList = reactive([
    {
      name: "MetaMask",
      browserProvider: null,
      // 检查对象名
      _checkObject: "ethereum",
    },
    {
      name: "OKX",
      browserProvider: null,
      _checkObject: "okxwallet",
    },
  ])
  // 更新受支持的walletList
  function updateSupportWalletList() {
    supportWalletList.forEach((cur) => {
      if (typeof window[cur._checkObject] !== "undefined") {
        // 该钱包拓展可用
        cur.browserProvider = window[cur._checkObject]
      } else {
        // 该钱包拓展不可用
        cur.browserProvider = null
      }
    })

    // console.log(supportWalletList)
  }

  // 已登入的用户的钱包地址
  let userWallet = ref({
    address: "",
    addressFormat: computed(() => {
      if (userWallet.value.address) {
        return (
          userWallet.value.address.slice(0, 6) +
          "..." +
          userWallet.value.address.slice(-6)
        )
      } else {
        return ""
      }
    }),
    token: "",
  })

  // 用于操作的signer（无响应式）
  let signer = null
  // (登入)获取signer
  async function getSigner(walletName) {
    if (signer !== null) {
      return signer
    }
    // 更新当前受支持的钱包状态
    updateSupportWalletList()

    // 要登入的钱包对象
    let wallet = null

    if (walletName) {
      // 有指定的钱包
      for (let i = 0; i < supportWalletList.length; i++) {
        if (supportWalletList[i].name === walletName) {
          wallet = supportWalletList[i]
          break
        }
      }
    } else {
      // 无指定钱包
      for (let i = 0; i < supportWalletList.length; i++) {
        if (supportWalletList[i].browserProvider !== null) {
          wallet = supportWalletList[i]
          break
        }
      }
    }

    // 校验钱包对象是否可用
    if (wallet !== null && wallet?.browserProvider !== null) {
      // 获取provider
      // const provider = new ethers.BrowserProvider(wallet.browserProvider)
      const provider = new ethers.providers.Web3Provider(
        wallet.browserProvider,
        // https://github.com/ethers-io/ethers.js/issues/866
        // 允许网络更改
        "any"
      )

      // 连接钱包
      try {
        // signer = await provider.getSigner()
        await provider.provider.request({ method: "eth_requestAccounts" })
        signer = provider.getSigner()
        const signerAddress = await signer.getAddress()

        let token = localStorage.getItem("token")
        if (!token) {
          const qr = getQueryString()

          // 获取签名消息
          const resGetSign = await getSignatureMessage({
            address: signerAddress,
            inviteAddress: qr?.inviteAddress || "",
          })
          const signMsg = resGetSign.data.result
          console.log(signMsg)

          // 签名
          const signedMsg = await signer.signMessage(signMsg)

          // const addr = ethers.verifyMessage(signMsg, signedMsg)
          // console.log("addr:", addr)

          // 验证签名消息获取token
          const resVerify = await verifySignature({
            address: signerAddress,
            message: signedMsg,
          })
          token = resVerify.data.result
          localStorage.setItem("token", token)
        } else {
          // 校验地址和token 不正确request会清理
          await verifyAddress({
            address: signerAddress,
            token: token,
          })
        }

        try {
          // 添加OKTC链
          await addNetwork(signer)

          // 切换OKTC链
          await signer.provider.send("wallet_switchEthereumChain", [
            { chainId: CHAIN_ID },
          ])
        } catch (error) {
          ElMessage({
            type: "warning",
            message: error.message,
          })

          return
        }

        // 登陆成功
        userWallet.value.address = signerAddress
        userWallet.value.token = token
        localStorage.setItem("walletName", wallet.name)

        // 登陆事件
        bus.emit("onGetSigner", {})

        return signer
      } catch (error) {
        clearSigner()

        return {
          msg: error.reason,
          error: true,
          errorType: errorType.UNKNOWN,
        }
      }
    } else {
      // 钱包未安装
      return {
        msg: "Wallet Not Installed.",
        error: true,
        errorType: errorType.NO_WALLET,
      }
    }
  }
  // （登出）清除signer
  function clearSigner() {
    signer = null
    userWallet.value.address = ""
    userWallet.value.token = ""
    localStorage.setItem("walletName", "")
    localStorage.setItem("token", "")

    // 登出事件
    bus.emit("onClearSigner", {})
  }

  // 支付
  async function payUSDT(contractAddress, receiveAccount, amount) {
    try {
      await checkAndSwitchChainId()
    } catch (error) {
      console.log(error)
      return
    }

    const _signer = await getSigner()

    const contractUSDT = new ethers.Contract(
      contractAddress,
      contractConfig.abi.USDT,
      _signer
    )

    try {
      const signerAddress = await _signer.getAddress()
      const balance = await contractUSDT.balanceOf(signerAddress)

      if (balance.lt(amount)) {
        return {
          error: true,
          msg: "Insufficient token balance.",
          errorType: errorType.INSUFFICIENT_BALANCE,
        }
      }

      return contractUSDT.transfer(receiveAccount, amount)
    } catch (error) {
      console.log(error)
      return {
        error: true,
        msg: "Network Error, retry.",
        errorType: errorType.UNKNOWN,
      }
    }
  }

  // mint
  async function mintL2(contract, ticker) {
    if (!userWallet.value.token) {
      ElMessage({
        type: "warning",
        message: "Please connect first",
      })
      return
    }

    // white List
    const resVerifyWhitelist = await verifyWhitelist({ ticker })
    if (resVerifyWhitelist?.data?.result === false) {
      ElMessage({
        type: "error",
        message: "You are not in whitelist",
      })
      return
    }

    const _signer = await getSigner()

    const contractL2 = new ethers.Contract(
      contract,
      contractConfig.abi.L2TOKEN,
      _signer
    )

    // 检查合约是否可mint
    let mintable
    try {
      mintable = await contractL2.mintable()
    } catch (error) {
      console.log(error)
      ElMessage({
        type: "error",
        message: "Call contract failed, try again later.",
      })
      // 合约错误
      return
    }

    if (mintable === false) {
      // 合约已无法mint
      ElMessage({
        type: "warning",
        message: "This token is no longer mintable, please try another token.",
      })
      return
    }

    // 用户拒绝，交易失败
    try {
      const resTx = await contractL2.mint()
      // 等待交易
      await resTx.wait()

      // 完成任务
      completeTask({
        // 完成mint任务
        id: 5,
      })

      ElMessage({
        type: "success",
        message: "Operation successful",
      })
    } catch (error) {
      console.log(error)

      let msg = ""
      if (error.message.includes("user rejected transaction")) {
        msg = "User rejected transaction!"
      } else if (error.message.includes("this token is not mintable")) {
        msg = "This token is not mintable"
      } else {
        msg = "Mint failed"
      }

      ElMessage({
        type: "error",
        message: msg,
      })
    }
  }

  // 添加代币到钱包
  async function addTokenToWallet(contractAddress, symbol, decimals) {
    let _signer = null
    try {
      _signer = await getSigner()
    } catch (error) {
      console.log(error)
    }

    if (_signer === null) {
      ElMessage({
        type: "warning",
        message: "Please connect first",
      })

      return
    }

    const params = {
      type: "ERC20",
      options: {
        address: contractAddress,
        symbol: symbol, // 代币符号
        decimals: decimals, // 代币小数位数
        image: "",
      },
    }
    return await signer.provider.send("wallet_watchAsset", params)
  }

  // 添加OK链
  async function addNetwork(signer) {
    let _provider = signer.provider

    // 添加OKTC链
    const nativeCurrency = {
      name: CURRENCY_SYMBOL,
      symbol: CURRENCY_SYMBOL,
      decimals: 18,
    }
    await _provider.send("wallet_addEthereumChain", [
      {
        chainId: CHAIN_ID, // Chain ID of the custom network
        chainName: CHAIN_NAME, // Name of the custom network
        nativeCurrency: nativeCurrency,
        rpcUrls: [RPC_URL], // RPC URL of your custom network
      },
    ])
  }

  // 校验当前链id并切换
  async function checkAndSwitchChainId() {
    // 已连接才校验 否则不校验
    if (userWallet.value.address) {
      const _signer = await getSigner()
      const curChainId = await _signer.getChainId()

      if (curChainId !== CHAIN_ID) {
        // 当前链id不匹配，尝试切换

        await addNetwork(_signer)

        try {
          return await _signer.provider.send("wallet_switchEthereumChain", [
            { chainId: CHAIN_ID },
          ])
        } catch (error) {
          ElMessage({
            type: "warning",
            message: error.message,
          })
          console.error("网络切换失败:", error)
        }
      } else {
        console.log("ChainId correct")
      }
    }
  }

  // 错误表
  const errorType = {
    NO_WALLET: Symbol("NO_WALLET"),
    UNKNOWN: Symbol("UNKNOWN"),
    INSUFFICIENT_BALANCE: Symbol("INSUFFICIENT_BALANCE"),
  }

  return {
    supportWalletList,
    updateSupportWalletList,
    getSigner,
    clearSigner,
    payUSDT,
    mintL2,
    addTokenToWallet,
    checkAndSwitchChainId,
    userWallet,
    errorType,
  }
})
