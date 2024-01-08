<template>
  <div class="bg-dark pt-5">
    <div
      class="container footer-container d-flex flex-column flex-lg-row justify-content-lg-around pb-5"
    >
      <!-- LOGO -->
      <div class="pe-0 pe-lg-3 pb-3 pb-lg-5 pb-lg-0">
        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <div
            class="mt-3 d-flex justify-content-center justify-content-lg-start"
          >
            <img class="logo-img" src="@/assets/img/UNISRC20.png" />
          </div>
          <div class="text-secondary pt-3 text-break">
            © 2023 UniSRC20 All rights reserved.
          </div>
        </div>
      </div>
      <!-- LOGO end -->
      <!-- SOCIAL -->
      <div class="pe-0 pe-lg-3 pb-3 pb-lg-5 pb-lg-0">
        <h3 class="text-secondary text-center text-lg-start">Useful Links</h3>
        <div class="d-flex flex-column text-center text-lg-start">
          <a
            class="link-a text-decoration-none text-secondary"
            target="_blank"
            href="https://unisrc20.com"
          >
            <i class="iconfont icon-facebook3 footer-content-text-fs"></i>
            <span class="footer-content-text-fs">Official Website</span>
          </a>
          <a
            class="link-a text-decoration-none text-secondary"
            target="_blank"
            href="https://unisrc20.gitbook.io/wiki/platform/unisrc-20"
          >
            <i class="iconfont icon-facebook3 footer-content-text-fs"></i>
            <span class="footer-content-text-fs">Gitbook</span>
          </a>
          <a
            class="link-a text-decoration-none text-secondary"
            target="_blank"
            href="https://twitter.com/unisrc20"
          >
            <i class="iconfont icon-facebook3 footer-content-text-fs"></i>
            <span class="footer-content-text-fs">Twitter</span>
          </a>
          <a
            class="link-a text-decoration-none text-secondary"
            target="_blank"
            href="https://t.co/eVNMU1QQ0I"
          >
            <i class="iconfont icon-facebook3 footer-content-text-fs"></i>
            <span class="footer-content-text-fs">Discord</span>
          </a>
        </div>
      </div>
      <!-- SOCIAL end -->
      <!-- SOURCE -->
      <div class="pe-0 pe-lg-3 pb-3 pb-lg-5 pb-lg-0">
        <h3 class="text-secondary text-center text-lg-start">Navigate</h3>
        <div
          class="d-flex flex-column text-center text-lg-start text-decoration-none text-secondary"
        >
          <div
            class="cursor-pointer footer-content-text-fs"
            @click="navTo('l2')"
          >
            <span>Brc20 L2</span>
          </div>
          <div
            class="cursor-pointer footer-content-text-fs"
            @click="navTo('inscribe')"
          >
            <span>Inscribe</span>
          </div>
          <div
            class="cursor-pointer footer-content-text-fs"
            @click="navTo('my-wallet')"
          >
            <span>Wallet</span>
          </div>
        </div>
      </div>
      <!-- SOURCE end -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

// 导航
function navTo(name) {
  router.push({
    name,
  })
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}

.footer-container {
  .logo-img {
    width: 130px;
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
