<template>
  <div class="bg-body-tertiary pt-5">
    <div
      class="container footer-container d-flex flex-column align-items-center flex-lg-row justify-content-lg-around pb-5"
    >
      <!-- LOGO -->
      <div class="pe-0 pe-lg-3 pb-3 pb-lg-5 pb-lg-0">
        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <div
            class="mt-3 d-flex justify-content-center justify-content-lg-start align-items-center"
          >
            <img class="logo-img" src="@/assets/img/UNISRC20.png" />
            <span class="fs-1">{{ TITLE }}</span>
          </div>
          <!-- <div class="text-secondary pt-3 text-break">
            © 2023 UniSRC20 All rights reserved.
          </div> -->
        </div>
      </div>
      <!-- LOGO end -->

      <!-- Add Token To Wallet -->
      <div class="pe-0 pe-lg-3 pb-3 pb-lg-5 pb-lg-0">
        <!-- <h3 class="text-secondary text-center text-lg-start">Add Token</h3> -->
        <div class="row text-center text-md-start">
          <div class="col-12">
            <div class="cursor-pointer" @click="handleAddToken('USDT')">
              <img
                class="me-1"
                style="width: 35px; height: 35px"
                src="@/assets/img/icon-usdt.png"
              />
              <span class="fs-5">Add To Wallet</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Add Token To Wallet end -->

      <!-- SOCIAL -->
      <div class="pe-0 pe-lg-3 pb-3 pb-lg-5 pb-lg-0">
        <!-- <h3 class="text-secondary text-center text-lg-start">Social Media</h3> -->
        <div class="row gx-4 text-center text-md-start">
          <div class="col-2 fs-3">
            <a
              class="link-underline-dark"
              href="https://unisrc20.com/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-house-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"
                />
                <path
                  d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"
                />
              </svg>
            </a>
          </div>

          <div class="col-2 fs-3">
            <a
              class="link-underline-dark"
              href="https://unisrc20.gitbook.io/wiki/platform/unisell-platform/unisell.io"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-book-half"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"
                />
              </svg>
            </a>
          </div>

          <div class="col-2 fs-3">
            <a
              class="link-underline-dark"
              href="https://twitter.com/@unisrc20"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-twitter"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"
                />
              </svg>
            </a>
          </div>

          <div class="col-2 fs-3">
            <a
              class="link-underline-dark"
              href="https://t.me/unisrc20"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-telegram"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"
                />
              </svg>
            </a>
          </div>

          <div class="col-2 fs-3">
            <a
              class="link-underline-dark"
              href="https://discord.com/invite/MqGCVEZExc"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-discord"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"
                />
              </svg>
            </a>
          </div>

          <div class="col-2 fs-3">
            <a
              class="link-underline-dark"
              href="https://github.com/UniSRC-20"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <!-- SOCIAL end -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { contractConfig } from "@/contract/contract.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { ElMessage } from "element-plus"
import { ref } from "vue"

const TITLE = ref(import.meta.env.VITE_PROJECT_NAME_SHOW)

const router = useRouter()
const web3Wallet = useWeb3Wallet()

// 导航
function navTo(name) {
  router.push({
    name,
  })
}

// 添加代币
async function handleAddToken(tokenType) {
  const CHAIN_ID = import.meta.env.VITE_BASE_CHAIN_ID

  let contractInfo
  if (tokenType === "USDT") {
    contractInfo = contractConfig.usdtContractInfo[CHAIN_ID]
  } else {
    // 其他代币
  }

  try {
    await web3Wallet.addTokenToWallet(
      contractInfo.contract,
      contractInfo.symbol,
      contractInfo.decimals
    )
  } catch (error) {
    ElMessage({
      type: "warning",
      message: error.message || "Error",
    })
    console.log(error)
  }
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}

.footer-container {
  .logo-img {
    width: 90px;
  }

  // 页脚部分字体大小
  .footer-content-text-fs {
    font-size: 1rem;
  }
}
// 【PC端】
@media (min-width: 992px) {
}
</style>
