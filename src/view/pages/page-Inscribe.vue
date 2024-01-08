<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.pageInscribe.Inscribe") }}
      </h2>

      <div class="inscribe-form">
        <div class="form-panel bg-light-subtle">
          <!-- 筛选 -->
          <div class="py-3">
            <div class="btn-group" role="group">
              <button
                type="button"
                :class="{ active: inscribeMode === '1' }"
                class="btn btn-outline-primary"
                @click="handleInscribeModeChange('1')"
              >
                {{ $t("pages.pageInscribe.Mint") }}
              </button>
              <button
                type="button"
                :class="{ active: inscribeMode === '2' }"
                class="btn btn-outline-primary"
                @click="handleInscribeModeChange('2')"
              >
                {{ $t("pages.pageInscribe.Deploy") }}
              </button>
            </div>
          </div>
          <!-- Mint表单 -->
          <el-form
            v-if="inscribeMode === '1'"
            ref="refFormMint"
            :model="formDataMint"
            :rules="rulesMint"
            label-position="top"
            label-width="auto"
            status-icon
          >
            <el-form-item class="w-100" label="Tick" prop="tick">
              <el-input
                v-model="formDataMint.tick"
                @input="handleMintTickInput"
              />
            </el-form-item>
            <div class="d-lg-flex w-100 justify-content-between">
              <el-form-item
                class="small-item"
                :label="$t('pages.pageInscribe.Max')"
              >
                <el-input disabled v-model="queryMintData.max" />
              </el-form-item>
              <el-form-item
                class="small-item"
                :label="$t('pages.pageInscribe.Minted')"
              >
                <el-input disabled v-model="queryMintData.minted" />
              </el-form-item>
            </div>
            <div class="d-lg-flex w-100 justify-content-between">
              <el-form-item
                class="small-item"
                :label="$t('pages.pageInscribe.Limit')"
              >
                <el-input disabled v-model="queryMintData.limit" />
              </el-form-item>
              <el-form-item
                class="small-item"
                :label="$t('pages.pageInscribe.RemainingMintTimes')"
              >
                <el-input disabled v-model="queryMintData.remaining" />
              </el-form-item>
            </div>
            <el-form-item class="w-100">
              <button class="w-100 btn btn-primary" @click="submitFormMint">
                {{ $t("pages.pageInscribe.Query") }}
              </button>
            </el-form-item>
            <el-form-item class="w-100">
              <button
                class="w-100 btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#mintModal"
              >
                {{ $t("pages.pageInscribe.MintBtn") }}
              </button>
            </el-form-item>
          </el-form>
          <!-- Mint表单 end -->
          <!-- Deploy表单 -->
          <el-form
            v-if="inscribeMode === '2'"
            ref="refFormDeploy"
            :model="formDataDeploy"
            :rules="rulesDeploy"
            label-position="top"
            label-width="auto"
            status-icon
          >
            <el-form-item class="w-100" label="Tick" prop="tick">
              <el-input
                v-model="formDataDeploy.tick"
                @input="handleMintTickInput"
              />
            </el-form-item>

            <el-form-item label="Max">
              <template #label>
                {{ $t("pages.pageInscribe.Max_Max_Limit_Repeat") }}
              </template>
              <el-input disabled v-model="deployMax" />
            </el-form-item>
            <div class="d-lg-flex w-100 justify-content-between">
              <el-form-item
                class="small-item"
                :label="$t('pages.pageInscribe.Limit')"
                prop="limit"
              >
                <el-input-number
                  class="w-100"
                  v-model="formDataDeploy.limit"
                  :min="1"
                  :step="1"
                  :precision="0"
                  placeholder="1000"
                />
              </el-form-item>
              <el-form-item
                class="small-item"
                :label="$t('pages.pageInscribe.Repeat')"
                prop="repeat"
              >
                <el-input-number
                  class="w-100"
                  v-model="formDataDeploy.repeat"
                  :min="1"
                  :step="1"
                  :precision="0"
                  placeholder="1000"
                />
              </el-form-item>
            </div>

            <el-form-item class="w-100">
              <el-form-item class="w-100">
                <button class="w-100 btn btn-primary" @click="submitFormDeploy">
                  {{ $t("pages.pageInscribe.DeployBtn") }}
                </button>
              </el-form-item>
            </el-form-item>
          </el-form>
          <!-- Deploy表单 end -->
        </div>
      </div>
    </div>

    <!-- Modal mint -->
    <comModalMint />
    <!-- Modal mint end -->

    <!-- Modal depoly -->
    <div
      class="modal fade"
      id="deployModal"
      tabindex="-1"
      aria-labelledby="deployModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ $t("pages.pageInscribe.Deploy") }}</h5>
          </div>
          <!-- 弹窗body -->
          <div class="modal-body text-gray">
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
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="submitFormDeployModal"
            >
              Submit
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              id="deployModalClose"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal depoly end -->
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue"
import comModalMint from "@/components/com-modal-mint.vue"
import * as bootstrap from "bootstrap"

// 模式 1mint 2deploy
const inscribeMode = ref("1")
function handleInscribeModeChange(val) {
  inscribeMode.value = val
}

// MINT 表单
const refFormMint = ref(null)
const formDataMint = reactive({
  tick: "",
})
const rulesMint = reactive({
  tick: [
    { required: true, message: "Please input", trigger: "blur" },
    { min: 4, max: 4, message: "Tick's length must be 4", trigger: "blur" },
  ],
})
const submitFormMint = async () => {
  if (!refFormMint.value) return
  await refFormMint.value.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!", fields)
    }
  })
}
const resetFormMint = async () => {
  if (!refFormMint.value) return
  refFormMint.value.resetFields()
}
// Query查询的数据
const queryMintData = ref({})
function clearQueryMintData() {
  queryMintData.value = {
    max: "",
    minted: "",
    limit: "",
    remaining: "",
  }
}
function handleMintTickInput() {
  clearQueryMintData()
}
function handleGoMint() {
  // TODO:打开Mint弹窗
}

// Deploy表单
const refFormDeploy = ref(null)
const formDataDeploy = reactive({
  tick: "",
  limit: null,
  repeat: null,
})
const deployMax = computed(() => {
  if (formDataDeploy.limit && formDataDeploy.repeat) {
    return formDataDeploy.limit * formDataDeploy.repeat
  } else {
    return ""
  }
})

const rulesDeploy = reactive({
  tick: [
    { required: true, message: "Please input", trigger: "blur" },
    { min: 4, max: 4, message: "Tick's length must be 4", trigger: "blur" },
  ],
  repeat: [{ required: true, message: "Please input", trigger: "blur" }],
  limit: [{ required: true, message: "Please input", trigger: "blur" }],
})
const submitFormDeploy = async () => {
  if (!refFormDeploy.value) return
  await refFormDeploy.value.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!")
      handleGoDeploy()
    } else {
      console.log("error submit!", fields)
    }
  })
}
const resetFormDeploy = async () => {
  if (!refFormDeploy.value) return
  refFormDeploy.value.resetFields()
}
// 打开deploy弹窗
function handleGoDeploy() {
  const myModal = bootstrap.Modal.getOrCreateInstance("#deployModal")
  myModal.show()
}
// deploy submit
async function submitFormDeployModal() {}
// Deploy表单 end
</script>

<style lang="scss" scoped>
.inscribe-form {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  .form-panel {
    width: 100%;
    padding: 1rem;
    max-width: 700px;

    border-radius: 0.375rem;
  }
}

// 【PC端】
@media (min-width: 992px) {
  .inscribe-form {
    margin-bottom: 3rem;
    .form-panel {
      padding: 2rem;
    }
    .small-item {
      width: 48%;
    }
  }
}
</style>
