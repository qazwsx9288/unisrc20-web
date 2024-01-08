<template>
  <div
    class="modal fade"
    id="mintModal"
    tabindex="-1"
    aria-labelledby="mintModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Mint</h5>
        </div>
        <!-- 弹窗body -->
        <div class="modal-body text-gray">
          <el-form
            ref="refFormMintModal"
            :model="formDataMintModal"
            :rules="rulesMintModal"
            label-position="top"
            label-width="auto"
            status-icon
          >
            <el-form-item class="w-100" label="Repeat" prop="repeat">
              <el-slider
                v-model="formDataMintModal.repeat"
                :min="1"
                show-input
              />
            </el-form-item>
            <el-divider />
            <table class="table">
              <tbody>
                <tr>
                  <td>Sats In Inscription</td>
                  <td>≈1000 USDT</td>
                </tr>
                <tr>
                  <td>Commit Transaction Fee</td>
                  <td>≈1000 USDT</td>
                </tr>
                <tr>
                  <td>Reveal Transaction Fee</td>
                  <td>≈1000 USDT</td>
                </tr>
                <tr>
                  <td>Service Fee</td>
                  <td>1000 USDT</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>≈1000 USDT</th>
                </tr>
              </tbody>
            </table>
          </el-form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="submitFormMintModal"
          >
            Submit
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            id="mintModalClose"
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
import { ref, reactive } from "vue"

// mint表单弹窗
const refFormMintModal = ref(null)
const formDataMintModal = reactive({
  repeat: 1,
})
const rulesMintModal = reactive({
  repeat: [{ required: true, message: "Please input", trigger: "blur" }],
})
const submitFormMintModal = async () => {
  if (!refFormMintModal.value) return
  await refFormMintModal.value.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!", fields)
    }
  })
}
const resetFormMintModal = async () => {
  if (!refFormMintModal.value) return
  refFormMintModal.value.resetFields()
}
</script>

<style lang="scss" scoped></style>
