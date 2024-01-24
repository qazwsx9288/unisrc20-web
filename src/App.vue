<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue"

import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { ethers } from "ethers"

const web3Wallet = useWeb3Wallet()

onBeforeUnmount(() => {
  // 在组件销毁前移除监听器，以防止内存泄漏
  if (window.ethereum && window.ethereum.removeListener) {
    window.ethereum.removeListener("chainChanged", handleNetworkChange)
    window.ethereum.removeListener("accountsChanged", handleAccountChange)
  }
})

onMounted(async () => {
  // 加载主题
  const theme = localStorage.getItem("unisrc20-theme") || "dark"
  document.body.setAttribute("data-bs-theme", theme)
  document.getElementById("html").className = theme

  // 网络切换钩子
  if (window.ethereum) {
    window.ethereum.on("chainChanged", handleNetworkChange)
  }

  // 钱包切换钩子
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", handleAccountChange)
  }

  // 检查登陆状态
  const walletName = localStorage.getItem("walletName")
  if (walletName) {
    web3Wallet.getSigner(walletName)
  }
})

//
const handleAccountChange = async () => {
  web3Wallet.clearSigner()
}

const handleNetworkChange = async (networkId) => {
  console.log(networkId)
}
</script>

<style scoped></style>
