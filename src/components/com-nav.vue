<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand flex align-items-center" href="#">
          <img
            style="height: 40px; width: 40px"
            src="@/assets/img/UNISRC20.png"
          />
          {{ TITLE }}
        </a>

        <!-- 响应式 移动端的菜单toggle -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 响应式 移动端的菜单toggle end -->

        <!-- 菜单列表 -->
        <div class="collapse navbar-collapse" id="navbarToggler">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li v-for="(item, index) in menuList" :key="index" class="nav-item">
              <button
                type="button"
                @click="navTo(item.name)"
                class="nav-link me-2"
                :class="{
                  'link-primary': item.name === currentRoute?.getRoute?.name,
                }"
              >
                {{ item.label }}
              </button>
            </li>
          </ul>

          <!-- 固定菜单 -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link me-2"
                href="https://swap.unisrc20.com/swap"
                target="_blank"
              >
                Swap
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link me-2"
                href="https://ai.unisrc20.com/marketplace_demo/"
                target="_blank"
              >
                Avatar
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link me-2"
                href="https://medium.com/@unisrc20"
                target="_blank"
              >
                🔥<span style="color: rgb(251, 146, 60)">AirDrop</span>
              </a>
            </li>
          </ul>
          <!-- 固定菜单 end -->

          <!-- 菜单栏右侧 -->
          <div class="d-flex">
            <!-- 语言 -->
            <div class="dropdown">
              <button
                class="btn btn-outline-primary me-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ $t("comNav.Language") }}
              </button>

              <ul class="dropdown-menu">
                <li v-for="(item, index) in langList" :key="index">
                  <button class="dropdown-item" @click="switchLang(item.value)">
                    {{ item.label }}
                  </button>
                </li>
              </ul>
            </div>

            <!-- 主题切换 -->
            <button
              class="btn btn-outline-primary me-2"
              @click="colorModeToggle"
            >
              <svg
                v-show="colorMode === 'light'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-lightbulb"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"
                />
              </svg>
              <svg
                v-show="colorMode === 'dark'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-moon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"
                />
              </svg>
            </button>

            <!-- 连接按钮 -->
            <button
              v-show="!web3Wallet?.userWallet?.address"
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#signInModal"
            >
              {{ $t("comNav.Connect") }}
            </button>
            <!-- 登陆后的钱包 -->
            <div v-show="web3Wallet?.userWallet?.address" class="dropdown">
              <button
                class="btn btn-outline-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="true"
              >
                {{ web3Wallet?.userWallet?.addressFormat }}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="btn dropdown-item"
                    @click="navTo('deploy-order')"
                  >
                    {{ i18n.t("comNav.DeployOrder") }}
                  </button>
                </li>
                <!-- <li>
                  <button
                    class="btn dropdown-item"
                    @click="navTo('mint-order')"
                  >
                    {{ $t("comNav.MintOrder") }}
                  </button>
                </li> -->
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button
                    class="btn text-danger dropdown-item"
                    @click="handleDisconnect"
                  >
                    {{ $t("comNav.Disconnect") }}
                  </button>
                </li>
              </ul>
            </div>
            <!-- 登陆后的钱包 end -->
          </div>
          <!-- 菜单栏右侧 end -->
        </div>
        <!-- 菜单列表 end -->
      </div>
    </nav>

    <!-- Modal 连接钱包选择 -->
    <comModalConnect />
    <!-- Modal 连接钱包选择 end -->
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCurrentRoute } from "@/pinia/modules/currentRoute.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import comModalConnect from "@/components/com-modal-connect.vue"
import { useI18n } from "vue-i18n"

const TITLE = ref(import.meta.env.VITE_PROJECT_NAME_SHOW)

const i18n = useI18n()
const web3Wallet = useWeb3Wallet()
const router = useRouter()
// 当前路由store
const currentRoute = useCurrentRoute()

// 菜单列表
const menuList = [
  {
    name: "l2",
    label: "Brc20(L2)",
  },
  {
    name: "inscribe",
    label: i18n.t("comNav.inscribe"),
  },
  {
    name: "earn-points",
    label: i18n.t("comNav.EarnPoints"),
  },
  {
    name: "my-wallet",
    label: i18n.t("comNav.wallet"),
  },
  // {
  //   name: "market",
  //   label: "Market",
  // },
]

// 语言列表
const langList = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Chinese",
    value: "zh-hk",
  },
]
// 切换语言
function switchLang(val) {
  localStorage.setItem("language", val)
  location.reload()
}

// 主题
const colorMode = ref("")
colorMode.value = localStorage.getItem("unisrc20-theme") || "dark"
function colorModeToggle() {
  if (colorMode.value === "dark") {
    colorMode.value = "light"
    document.getElementById("html").className = "light"
    document.body.setAttribute("data-bs-theme", "light")
    localStorage.setItem("unisrc20-theme", "light")
  } else if (colorMode.value === "light") {
    colorMode.value = "dark"
    document.body.setAttribute("data-bs-theme", "dark")
    document.getElementById("html").className = "dark"
    localStorage.setItem("unisrc20-theme", "dark")
  }
  // 设置 bootstrap、element 暗黑模式
}

// 登出
async function handleDisconnect() {
  web3Wallet.clearSigner()
}

// 导航
function navTo(name) {
  router.push({
    name,
  })
}
</script>

<style lang="scss" scoped></style>
