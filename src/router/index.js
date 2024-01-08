import { createRouter, createWebHashHistory } from "vue-router"
import pages from "./modules/pages.js"

import { useCurrentRoute } from "@/pinia/modules/currentRoute.js"

import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"

const routes = [pages]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 后置路由守卫
router.afterEach(async (to) => {
  // 设置当前路由信息
  const currentRoute = useCurrentRoute()
  currentRoute.setRoute(to)

  // 校验当前链id是否正确
  const web3Wallet = useWeb3Wallet()
  if (web3Wallet.userWallet.address) {
    const CHAIN_ID = import.meta.env.VITE_BASE_CHAIN_ID
    const signer = await web3Wallet.getSigner()
    const curChainId = await signer.provider.send("eth_chainId", [])
    if (curChainId !== CHAIN_ID) {
      // 当前链id不匹配，尝试切换
      try {
        await signer.provider.send("wallet_switchEthereumChain", [
          { chainId: CHAIN_ID },
        ])
      } catch (error) {
        console.error("网络切换失败:", error)
      }
    }
  }
})

export default router
