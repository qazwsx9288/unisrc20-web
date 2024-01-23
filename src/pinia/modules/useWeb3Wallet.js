import { defineStore } from "pinia"
import { reactive, ref, computed } from "vue"
import { ethers } from "ethers"
import { getSignatureMessage, verifySignature } from "@/api/server-api.js"

export const useWeb3Wallet = defineStore("web3Wallet", () => {
  // config
  const RPC_URL = import.meta.env.VITE_BASE_OKX_RPC
  const CHAIN_ID = import.meta.env.VITE_BASE_CHAIN_ID

  // provider（无响应式）
  let defaultProvider = null
  // 获取provider
  function getDefaultProvider() {
    if (defaultProvider === null) {
      defaultProvider = ethers.getDefaultProvider(RPC_URL)
    }
    return defaultProvider
  }

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
      return (
        userWallet.value.address.slice(0, 6) +
        "..." +
        userWallet.value.address.slice(-6)
      )
    }),
    token: "",
  })

  // const addressFormat = computed(() => {
  //   return "xxxx" + userWallet.value.address + "xxxx"
  // })

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
    if (wallet?.browserProvider !== null) {
      // 连接钱包
      const provider = new ethers.BrowserProvider(wallet.browserProvider)
      try {
        signer = await provider.getSigner()

        let token = localStorage.getItem("token")
        if (!token) {
          // 获取签名消息
          const resGetSign = await getSignatureMessage({
            address: signer.address,
          })
          const signMsg = resGetSign.data.result
          console.log(signMsg)

          // 签名
          const signedMsg = await signer.signMessage(signMsg)

          // const addr = ethers.verifyMessage(signMsg, signedMsg)
          // console.log("addr:", addr)

          // 验证签名消息获取token
          const resVerify = await verifySignature({
            address: signer.address,
            message: signedMsg,
          })
          token = resVerify.data.result
          localStorage.setItem("token", token)
        }
        // 登陆成功
        userWallet.value.address = signer.address
        localStorage.setItem("walletName", wallet.name)

        return signer
      } catch (error) {
        clearSigner()

        console.log(error.reason)
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
  }

  // 错误表
  const errorType = {
    NO_WALLET: Symbol("NO_WALLET"),
    UNKNOWN: Symbol("UNKNOWN"),
  }

  return {
    supportWalletList,
    updateSupportWalletList,
    getSigner,
    clearSigner,
    getDefaultProvider,
    userWallet,
    errorType,
  }
})
