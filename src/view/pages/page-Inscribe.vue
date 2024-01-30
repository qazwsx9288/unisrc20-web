<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.pageInscribe.Inscribe") }}
      </h2>

      <!-- 筛选 -->
      <div class="d-flex justify-content-center py-3">
        <div class="btn-group" role="group">
          <button
            type="button"
            :class="{ active: inscribeMode === '2' }"
            class="btn btn-lg btn-outline-primary"
            @click="handleInscribeModeChange('2')"
          >
            {{ $t("pages.pageInscribe.Deploy") }}
          </button>

          <button
            type="button"
            :class="{ active: inscribeMode === '1' }"
            class="btn btn-lg btn-outline-primary"
            @click="handleInscribeModeChange('1')"
          >
            {{ $t("pages.pageInscribe.Mint") }}
          </button>
        </div>
      </div>
      <!-- 筛选 end -->

      <div class="inscribe-form">
        <!-- Mint表单 -->
        <div v-if="inscribeMode === '1'" class="form-panel bg-light-subtle">
          <el-form
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
                <el-input disabled v-model="queryMintData.totalSupply" />
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
              <button class="w-100 btn btn-primary" @click="submitMintQuery">
                {{ $t("pages.pageInscribe.Query") }}
              </button>
            </el-form-item>
            <el-form-item class="w-100">
              <button
                v-if="queryMintData.max"
                class="w-100 btn btn-primary"
                @click="submitMint()"
              >
                {{ $t("pages.pageInscribe.MintBtn") }}
              </button>
            </el-form-item>
          </el-form>
        </div>
        <!-- Mint表单 end -->

        <!-- Deploy表单 -->
        <div v-if="inscribeMode === '2'" class="form-panel-deploy">
          <el-form
            ref="refFormDeploy"
            :model="formDataDeploy"
            :rules="rulesDeploy"
            label-position="top"
            label-width="auto"
            status-icon
          >
            <div class="row gx-3">
              <!-- left -->
              <div class="col-12 col-md-6">
                <div class="p-3 h-100 bg-light-subtle rounded">
                  <div class="mb-3 fw-bolder">
                    {{ $t("pages.pageInscribe.Required") }}
                  </div>

                  <el-form-item class="w-100" label="Tick" prop="tick">
                    <el-input v-model="formDataDeploy.tick" />
                  </el-form-item>

                  <el-form-item label="Max">
                    <template #label>
                      {{ $t("pages.pageInscribe.Max_Max_Limit_Repeat") }}
                    </template>
                    <el-input disabled v-model="deployMax" />
                  </el-form-item>

                  <el-form-item
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

                  <div class="mb-3 p-3 border rounded text-break">
                    {{
                      `{"p":"brc-20","op":"deploy","tick":${
                        formDataDeploy.tick || ""
                      },"max":${deployMax || "0"},"lim":${
                        formDataDeploy.limit || "0"
                      } }`
                    }}
                  </div>

                  <div class="mt-3">
                    <button
                      type="button"
                      class="w-100 btn btn-primary"
                      @click="submitFormDeploy"
                    >
                      {{ $t("pages.pageInscribe.DeployBtn") }}
                    </button>
                  </div>
                </div>
              </div>
              <!-- left end -->

              <!-- right optional -->
              <div class="col-12 col-md-6">
                <div class="p-3 h-100 bg-light-subtle rounded">
                  <div class="mb-3 fw-bolder">
                    {{ $t("pages.pageInscribe.Optional") }}
                  </div>

                  <el-form-item label="" prop="files">
                    <el-upload
                      ref="refUpload"
                      v-model:file-list="formDataDeploy.files"
                      :auto-upload="false"
                      drag
                      :limit="1"
                      accept=".jpg, .jpeg, .png,"
                      :on-exceed="handleExceed"
                    >
                      <el-icon class="el-icon--upload"
                        ><upload-filled
                      /></el-icon>
                      <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                      </div>
                      <template #tip>
                        <div class="el-upload__tip">
                          LOGO: jpg/png files with a size less than 300kb
                        </div>
                      </template>
                    </el-upload>
                  </el-form-item>

                  <el-form-item
                    :label="$t('pages.pageInscribe.ProjectUrl')"
                    prop="projectUrl"
                  >
                    <el-input v-model="formDataDeploy.projectUrl" />
                  </el-form-item>

                  <el-form-item label="Twitter" prop="twitter">
                    <el-input v-model="formDataDeploy.twitter" />
                  </el-form-item>

                  <el-form-item label="Github" prop="github">
                    <el-input v-model="formDataDeploy.github" />
                  </el-form-item>

                  <el-form-item label="Telegram" prop="telegram">
                    <el-input v-model="formDataDeploy.telegram" />
                  </el-form-item>
                </div>
                <!-- right optional end -->
              </div>
            </div>
          </el-form>
        </div>
        <!-- Deploy表单 end -->
      </div>
    </div>

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
            <div class="btn-group mb-3" role="group">
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{ active: curDeployFee === 'slow' }"
                @click="handleDeployFeeSwitch('slow')"
              >
                Slow
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{ active: curDeployFee === 'avg' }"
                @click="handleDeployFeeSwitch('avg')"
              >
                Avg
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                :class="{ active: curDeployFee === 'fast' }"
                @click="handleDeployFeeSwitch('fast')"
              >
                FAST
              </button>
            </div>
            <table class="table">
              <tbody v-if="curDeployFeeObj">
                <tr>
                  <td>Sats In Inscription</td>
                  <td>≈{{ curDeployFeeObj.inscriptionPrice }} USDT</td>
                </tr>
                <tr>
                  <td>Commit Transaction Fee</td>
                  <td>≈{{ curDeployFeeObj.CommitPrice }} USDT</td>
                </tr>
                <tr>
                  <td>Reveal Transaction Fee</td>
                  <td>≈{{ curDeployFeeObj.revealPrice }} USDT</td>
                </tr>
                <tr>
                  <td>Service Fee</td>
                  <td>{{ curDeployFeeObj.serviceCharge }} USDT</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>≈{{ curDeployFeeObj.totalPrice }} USDT</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="deployModalLoading"
              @click="submitFormDeployModal"
            >
              <!-- <div
                
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div> -->

              <div v-if="deployModalLoading">
                <span
                  class="spinner-border spinner-border-sm text-light"
                  aria-hidden="true"
                ></span>
                <span class="visually-hidden" role="status">Loading...</span>
              </div>

              <span v-else>Submit</span>
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
import * as bootstrap from "bootstrap"
import {
  createOrder,
  gasCountLatest,
  verifyToken,
  orderMsg,
} from "@/api/server-api.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { ElMessage, genFileId } from "element-plus"
import { ethers } from "ethers"
import { contractConfig } from "@/contract/contract.js"
import { UploadFilled } from "@element-plus/icons-vue"
import { fileToBase64 } from "@/utils/helper.js"

const web3Wallet = useWeb3Wallet()

// 模式 1mint 2deploy
const inscribeMode = ref("2")
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
const submitMintQuery = async () => {
  if (!refFormMint.value) return
  await refFormMint.value.validate(async (valid, fields) => {
    if (valid) {
      const res = await orderMsg({
        ticker: formDataMint.tick,
      })
      if (res.data?.result?.ticker) {
        queryMintData.value = res.data.result
      } else {
        clearQueryMintData()
        resetFormMint()
        ElMessage({
          type: "warning",
          message: "Tick does not exist",
        })
      }
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
  queryMintData.value = {}
}
function handleMintTickInput() {
  clearQueryMintData()
}
// MINT
// TODO:完成任务
async function submitMint() {
  if (queryMintData.value.max === queryMintData.value.totalSupply) {
    ElMessage({
      type: "warning",
      message: "The remaining times is zero",
    })
    return
  }

  await web3Wallet.mintL2(
    queryMintData.value.contract,
    queryMintData.value.ticker
  )
}

// Deploy表单
const refFormDeploy = ref(null)
const formDataDeploy = reactive({
  tick: "",
  limit: null,
  repeat: null,
  projectUrl: "",
  twitter: "",
  github: "",
  telegram: "",
  medium: "",
  files: [],
})
const deployMax = computed(() => {
  if (formDataDeploy.limit && formDataDeploy.repeat) {
    return formDataDeploy.limit * formDataDeploy.repeat
  } else {
    return ""
  }
})
const checkUrl = (rule, value, callback) => {
  if (value === undefined || value === null || value === "") {
    callback()
    return
  }

  // 校验value是否是http链接
  const urlPattern =
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  if (urlPattern.test(value)) {
    callback()
  } else {
    callback(new Error("Error URL"))
  }
}
const checkFileSize = (rule, value, callback) => {
  if (value === undefined || value === null || value === "") {
    callback()
    return
  }

  if (value?.lengt == 0) {
    callback()
    return
  }

  // 获取文件大小，以KB为单位
  const file = value[0]
  var fileSizeKB = file.size / 1024
  // 检查文件大小是否小于 300KB
  if (fileSizeKB < 300) {
    callback() // 文件大小小于 300KB
  } else {
    callback(new Error("File size must < 300kb")) // 文件大小大于等于 300KB
  }
}
const rulesDeploy = reactive({
  tick: [
    { required: true, message: "Please input", trigger: "blur" },
    { min: 4, max: 4, message: "Tick's length must be 4", trigger: "blur" },
  ],
  repeat: [{ required: true, message: "Please input", trigger: "blur" }],
  limit: [{ required: true, message: "Please input", trigger: "blur" }],
  projectUrl: [{ validator: checkUrl, trigger: "blur" }],
  twitter: [{ validator: checkUrl, trigger: "blur" }],
  github: [{ validator: checkUrl, trigger: "blur" }],
  telegram: [{ validator: checkUrl, trigger: "blur" }],
  medium: [{ validator: checkUrl, trigger: "blur" }],
  files: [{ validator: checkFileSize, trigger: "blur" }],
})
// 上传组件文件超出限制的钩子 用于覆盖文件
const refUpload = ref(null)
function handleExceed(files) {
  refUpload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  refUpload.value.handleStart(file)
  // 手动上传
}
const submitFormDeploy = async () => {
  // 登陆校验
  if (!web3Wallet?.userWallet?.address) {
    ElMessage({
      type: "warning",
      message: "Please connect first",
    })
    return
  }

  if (!refFormDeploy.value) return
  await refFormDeploy.value.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!")
      // Tick已在BRC20
      try {
        const resVerifyToken = await verifyToken({
          ticker: formDataDeploy.tick,
        })
        if (
          resVerifyToken?.code === 0 &&
          resVerifyToken?.data?.result === false
        ) {
          ElMessage({
            type: "warning",
            message: "Tick already exists",
          })
          return
        }
      } catch (error) {
        console.log(error)
        return
      }

      try {
        await fetchDeployFee()
        handleGoDeploy()
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("error submit!", fields)
    }
  })
}
const resetFormDeploy = async () => {
  if (!refFormDeploy.value) return
  refFormDeploy.value.resetFields()
}
// deploy费用相关
const deployFee = ref({})
const curDeployFee = ref("avg")
const curDeployFeeObj = computed(() => {
  if (deployFee.value[curDeployFee.value]) {
    return deployFee.value[curDeployFee.value]
  } else {
    return null
  }
})
// 切换费用
async function handleDeployFeeSwitch(t) {
  curDeployFee.value = t
  fetchDeployFee()
}
// 获取deploy费用
async function fetchDeployFee() {
  const res = await gasCountLatest()
  deployFee.value = res.data.result.fee
}
// 打开deploy弹窗
function handleGoDeploy() {
  const myModal = bootstrap.Modal.getOrCreateInstance("#deployModal")
  myModal.show()
}
// deploy submit
const deployModalLoading = ref(false)
async function submitFormDeployModal() {
  deployModalLoading.value = true

  // logo转base64处理
  let logoBase64 = ""
  if (formDataDeploy.files?.length > 0) {
    const logoFile = formDataDeploy.files[0].raw
    try {
      logoBase64 = await fileToBase64(logoFile)
    } catch (error) {
      console.log(error)
    }
  }

  try {
    const res = await createOrder({
      ticker: formDataDeploy.tick,
      mode: curDeployFee.value,
      projectUrl: formDataDeploy.projectUrl,
      limit: String(formDataDeploy.limit),
      repeat: String(formDataDeploy.repeat),
      twitter: formDataDeploy.twitter,
      github: formDataDeploy.github,
      telegram: formDataDeploy.telegram,
      medium: formDataDeploy.medium,
      logoBase64: logoBase64,
    })

    console.log(res)

    if (res.code !== 0) {
      ElMessage({
        type: "error",
        message: res.msg,
      })
      return
    }

    const contractAddress = res.data.order.contractAddress
    const receiveAccount = res.data.order.receiveAccount
    const tx = await web3Wallet.payUSDT(
      contractAddress,
      receiveAccount,
      curDeployFeeObj.value.totalDecimal
    )

    if (tx.error) {
      ElMessage({
        type: "error",
        message: tx.msg,
      })
      return
    }

    await tx.wait()
    ElMessage({
      type: "success",
      message: "Operation successful!",
    })

    const myModal = bootstrap.Modal.getOrCreateInstance("#deployModal")
    myModal.hide()
  } catch (error) {
    console.log(error)
  } finally {
    deployModalLoading.value = false
  }
}
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

  .form-panel-deploy {
    width: 100%;
    padding: 1rem;
    max-width: 1000px;

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
