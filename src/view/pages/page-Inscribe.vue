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
              <el-input v-model="formDataDeploy.tick" />
            </el-form-item>

            <el-form-item
              class="w-100"
              :label="$t('pages.pageInscribe.ProjectUrl')"
              prop="projectUrl"
            >
              <el-input v-model="formDataDeploy.projectUrl" />
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
import { ElMessage } from "element-plus"
import { ethers } from "ethers"
import { contractConfig } from "@/contract/contract.js"

const web3Wallet = useWeb3Wallet()

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
  projectUrl: "",
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
      // 登陆校验
      if (!web3Wallet?.userWallet?.address) {
        ElMessage({
          type: "warning",
          message: "Please connect first",
        })
        return
      }

      // TOKEN已在BRC20
      try {
        const resVerifyToken = await verifyToken({
          ticker: formDataDeploy.tick,
        })
        if (resVerifyToken?.data.code === 0 && !resVerifyToken?.data?.result) {
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
  try {
    const res = await createOrder({
      ticker: formDataDeploy.tick,
      mode: curDeployFee.value,
      projectUrl: formDataDeploy.projectUrl,
      limit: String(formDataDeploy.limit),
      repeat: String(formDataDeploy.repeat),
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
