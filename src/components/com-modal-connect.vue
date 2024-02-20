<template>
  <div
    class="modal fade"
    id="signInModal"
    tabindex="-1"
    aria-labelledby="signInModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Choose Wallet</h5>
        </div>
        <!-- 弹窗body -->
        <div class="modal-body text-gray">
          <!-- 按钮组 -->
          <div class="list-group">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              aria-current="true"
              @click="signIn('MetaMask')"
            >
              <img
                class="me-2"
                style="width: 2rem; height: 2rem"
                src="@/assets/img/icon-metamask.png"
                alt=""
              />
              <span style="line-height: 2rem">MetaMask</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action"
              aria-current="true"
              @click="signIn('OKX')"
            >
              <img
                class="me-2"
                style="width: 2rem; height: 2rem"
                src="@/assets/img/icon-okx.png"
                alt=""
              />
              <span style="line-height: 2rem">OKX</span>
            </button>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            id="signInModalClose"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus"
import * as bootstrap from "bootstrap"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"

const web3Wallet = useWeb3Wallet()

// 登入
async function signIn(walletName) {
  web3Wallet.updateSupportWalletList()
  const signer = await web3Wallet.getSigner(walletName)

  if (signer?.error) {
    if (signer?.errorType !== web3Wallet.errorType.NO_WALLET) {
      // 登入失败
      if (signer?.msg) {
        ElMessage({
          message: signer.msg,
          type: "warning",
        })
      }
    } else {
      // 未安装钱包
      if (walletName === "MetaMask") {
        window.open(
          "https://chromewebstore.google.com/detail/nkbihfbeogaeaoehlefnkodbefgpgknn"
        )
      }
      if (walletName === "OKX") {
        window.open(
          "https://chromewebstore.google.com/detail/mcohilncbfahbmgdjkbpemcciiolgcge"
        )
      }
    }
  } else {
    // 成功登入
    closeModal()
  }
}

// 关闭弹窗
function closeModal() {
  const myModal = bootstrap.Modal.getOrCreateInstance("#signInModal")
  myModal.hide()
}
</script>

<style lang="scss" scoped></style>
