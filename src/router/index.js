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
  await web3Wallet.checkAndSwitchChainId()
})

export default router
