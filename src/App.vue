<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue"

import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { contractConfig } from "@/contract/contract.js"
import { ethers } from "ethers"

const web3Wallet = useWeb3Wallet()

onBeforeUnmount(() => {
  // 在组件销毁前移除监听器，以防止内存泄漏
  if (window.ethereum && window.ethereum.removeListener) {
    window.ethereum.removeListener("chainChanged", handleNetworkChange)
  }
})

onMounted(async () => {
  // 初始默认dark
  document.body.setAttribute("data-bs-theme", "dark")
  document.getElementById("html").className = "dark"
  // 网络切换钩子
  if (window.ethereum) {
    window.ethereum.on("chainChanged", handleNetworkChange)
  }
  // 检查登陆状态
  const walletName = localStorage.getItem("walletName")
  if (walletName) {
    web3Wallet.getSigner(walletName)
  }
})

const handleNetworkChange = async (networkId) => {
  console.log(networkId)
}

onMounted(async () => {})
</script>

<style scoped></style>
