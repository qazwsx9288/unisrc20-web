<template>
  <div class="page-min-h">
    <div class="container pb-5">
      <div>
        <!-- banner -->
        <div class="py-5 gx-5 row">
          <img
            class="col-12 col-md-6"
            src="@/assets/img/earn-points-1.svg"
            alt=""
          />

          <!-- 占位 -->
          <div class="col-12 col-md-1"></div>

          <div class="col-12 col-md-5 pt-5 pt-md-0 text-center text-md-start">
            <div class="banner-title-font">
              {{ $t("pages.pageEarnPoints.COMPLETETASKS") }}
            </div>
            <div class="banner-title-font">
              {{ $t("pages.pageEarnPoints.EARNPOINTS") }}
            </div>

            <!-- LeaderBoard -->
            <div class="pt-5">
              <button
                type="button"
                class="btn btn-lg btn-primary"
                @click="handleGoLeaderBoard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  class="bi bi-rocket-takeoff"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"
                  />
                  <path
                    d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z"
                  />
                  <path
                    d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"
                  />
                </svg>
                <span class="ms-2">Leaderboard ></span>
              </button>
            </div>
            <!-- LeaderBoard end -->
          </div>
        </div>
        <!-- banner end -->

        <!-- points -->
        <div class="pt-5 pb-4">
          <span class="bg-primary fs-4 text-light p-2 me-3 rounded">
            {{ $t("pages.pageEarnPoints.MyTotalPoints") }}:
            {{ dataInfo.taskScore + dataInfo.inviteScore }}
          </span>

          <span class="bg-primary fs-4 text-light p-2 rounded">
            {{ $t("pages.pageEarnPoints.MyRank") }}: {{ dataInfo?.rank || 0 }}
          </span>
        </div>
        <!-- points -->

        <!-- know -->
        <div class="fs-4 fw-bold pb-3 text-primary">
          {{ $t("pages.pageEarnPoints.Know UniSRC20") }}
          {{ TITLE }} (Get {{ knowTotalScoreCanGain }} Points)
        </div>

        <div class="pb-3">
          <el-table
            v-loading="fetchKnowTaskListLoading"
            class="rounded"
            size="large"
            :data="knowTaskList"
            style="width: 100%"
          >
            <el-table-column
              fixed
              :label="$t('pages.pageEarnPoints.Task')"
              width="auto"
            >
              <template #default="scope">
                {{ scope.row.taskName }}
              </template>
            </el-table-column>

            <el-table-column
              fixed
              prop="point"
              :label="$t('pages.pageEarnPoints.Points')"
              width="100"
            />

            <el-table-column
              fixed="right"
              :label="$t('pages.pageEarnPoints.Action')"
              width="150"
            >
              <template #default="scope">
                <a
                  v-if="
                    scope.row.done === 0 &&
                    web3Wallet.userWallet.token &&
                    scope.row.id !== 6
                  "
                  type="button"
                  class="btn btn-sm me-2"
                  :class="{
                    'btn-primary': scope.row.followSubmit != 1,
                    'btn-warning': scope.row.followSubmit == 1,
                  }"
                  @click="showSocialModal(scope.row)"
                >
                  <span v-if="scope.row.followSubmit == 1">Waiting</span>
                  <span v-else>To Do It</span>
                </a>

                <el-tag
                  v-if="scope.row.done === 1 && web3Wallet.userWallet.token"
                  type="success"
                >
                  Done
                </el-tag>

                <span v-if="!web3Wallet.userWallet.token && scope.row.id !== 6">
                  Connect First
                </span>

                <span v-if="scope.row.id === 6">Comming Soon</span>
                <!-- <span>Completed</span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- know end -->

        <!-- Try -->
        <div class="fs-4 fw-bold pb-3 text-primary">
          {{ $t("pages.pageEarnPoints.Try L2 UniSRC20") }}
          {{ TITLE }} (Get {{ tryTotalScoreCanGain }} Points)
        </div>

        <div class="pb-3">
          <el-table
            v-loading="fetchTryTaskListLoading"
            class="rounded"
            size="large"
            :data="tryTaskList"
            style="width: 100%"
          >
            <el-table-column
              fixed
              :label="$t('pages.pageEarnPoints.Task')"
              width="auto"
            >
              <template #default="scope">
                {{ scope.row.taskName }}
              </template>
            </el-table-column>

            <el-table-column
              fixed
              prop="point"
              :label="$t('pages.pageEarnPoints.Points')"
              width="100"
            />

            <el-table-column
              fixed="right"
              :label="$t('pages.pageEarnPoints.Action')"
              width="150"
            >
              <template #default="scope">
                <a
                  v-if="
                    scope.row.done === 0 &&
                    web3Wallet.userWallet.token &&
                    scope.row.id !== 6
                  "
                  type="button"
                  :href="scope.row.url"
                  target="_blank"
                  class="btn btn-sm btn-primary me-2"
                >
                  To do it
                </a>

                <el-tag
                  v-if="scope.row.done === 1 && web3Wallet.userWallet.token"
                  type="success"
                >
                  Done
                </el-tag>

                <span v-if="!web3Wallet.userWallet.token && scope.row.id !== 6">
                  Connect First
                </span>

                <span v-if="scope.row.id === 6">Comming Soon</span>
                <!-- <span>Completed</span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- Try end -->

        <div v-if="web3Wallet.userWallet.token" class="pb-3">
          <div class="fs-4 fw-bold pb-3 text-primary">
            {{ $t("pages.pageEarnPoints.Getmorepointsbyinvitingyourfriends") }}
          </div>
          <!-- <div class="pb-3">
            <span class="bg-primary fs-4 text-light p-2 rounded">
              {{ $t("pages.pageEarnPoints.Pointsbyinvited") }}:
              {{ dataInfo.inviteScore }}
            </span>
          </div> -->

          <div class="border p-3 rounded">
            <div class="fs-5 pb-3">
              {{ $t("pages.pageEarnPoints.CopythisURLtoyourfriends") }} (30
              Points per invited)
            </div>
            <div class="text-break">
              <span>{{ `${appUrl}/?inviteAddress=${dataInfo.address}` }}</span>
              <button
                class="btn btn-primary btn-sm ms-2"
                type="button"
                @click="handleCopyInviteUrl"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 社媒任务 -->
    <div
      class="modal fade"
      id="modalSocial"
      tabindex="-1"
      aria-labelledby="modalSocialLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ $t("pages.pageEarnPoints.socialModalTitle") }}
            </h5>
          </div>
          <!-- 弹窗body -->
          <div class="text-gray p-3">
            <div class="mb-2 fs-4 text-primary">Step 1</div>
            <div class="mb-2">
              {{ currentTask.taskName }}
            </div>
            <div class="mb-4">
              <a :href="currentTask.url" target="_blank">Click Here</a>
            </div>
            <div class="mb-2 fs-4 text-primary">Step 2</div>
            <el-form
              ref="refFormSocial"
              :model="formDataSocial"
              :rules="rulesSocial"
              label-position="top"
              label-width="auto"
              status-icon
            >
              <el-form-item class="w-100" label="Username" prop="name">
                <el-input
                  v-model="formDataSocial.name"
                  :placeholder="`Your Username In ${currentTask.name}`"
                />
              </el-form-item>
              <el-form-item class="w-100" label="Wallet">
                <el-input :value="web3Wallet.userWallet.address" disabled />
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              :disabled="modalSocialLoading"
              @click="submitFormModalSocial"
            >
              <div v-if="modalSocialLoading">
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
              id="modalSocialClose"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal 社媒任务 end -->
  </div>
</template>

<script setup>
// TODO:上线URL Know UniSRC20/Try L2 On UniSRC20
import { ref, reactive, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { getTaskList, collectData } from "@/api/server-api.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { copyToClipboard } from "@/utils/helper.js"
import bus from "vue3-eventbus"
import { ElMessage } from "element-plus"
import * as bootstrap from "bootstrap"

const TITLE = ref(import.meta.env.VITE_PROJECT_NAME_SHOW)

const router = useRouter()
const web3Wallet = useWeb3Wallet()

const appUrl = window.location.origin

onMounted(() => {
  bus.on("onGetSigner", () => {
    init()
  })

  bus.on("onClearSigner", () => {
    init()
  })

  init()
})

// init
async function init() {
  fetchInfo()
  fetchKnowTaskList()
  fetchTryTaskList()
}

// know列表
const knowTaskList = ref([])
// 求和
const knowTotalScoreCanGain = computed(() => {
  const total = knowTaskList.value.reduce((pre, cur) => {
    return pre + cur.point
  }, 0)

  if (total) {
    return total
  } else {
    return 0
  }
})
const fetchKnowTaskListLoading = ref(false)
async function fetchKnowTaskList() {
  fetchKnowTaskListLoading.value = true
  let res
  try {
    res = await getTaskList({
      taskType: "1",
    })
  } catch (error) {
    console.log(error)
  } finally {
    fetchKnowTaskListLoading.value = false
  }
  // 获取信息
  knowTaskList.value = res.data.result.task
}

// try列表
const tryTaskList = ref([])
// 求和
const tryTotalScoreCanGain = computed(() => {
  const total = tryTaskList.value.reduce((pre, cur) => {
    return pre + cur.point
  }, 0)

  if (total) {
    return total
  } else {
    return 0
  }
})
const fetchTryTaskListLoading = ref(false)
async function fetchTryTaskList() {
  fetchTryTaskListLoading.value = true
  let res
  try {
    res = await getTaskList({
      taskType: "2",
    })
  } catch (error) {
    console.log(error)
  } finally {
    fetchTryTaskListLoading.value = false
  }

  // 获取信息
  tryTaskList.value = res.data.result.task
}

// 信息
const dataInfo = ref({})
// 获取信息
async function fetchInfo() {
  const res = await getTaskList()
  // 获取信息
  dataInfo.value = res.data.result
}

// 导航到leaderboard
function handleGoLeaderBoard() {
  router.push({ name: "earn-points-rank" })
}

// 打开填写社媒弹窗
const currentTask = ref({})
function showSocialModal(item) {
  currentTask.value = item
  const myModal = bootstrap.Modal.getOrCreateInstance("#modalSocial")
  myModal.show()
}
// 填写社媒号提交
const modalSocialLoading = ref(false)
const refFormSocial = ref(null)
async function submitFormModalSocial() {
  await refFormSocial.value.validate(async (valid, fields) => {
    if (valid) {
      modalSocialLoading.value = true
      const reqData = {
        name: formDataSocial.name,
        taskId: currentTask.value.id,
      }
      try {
        const res = await collectData(reqData)
        if (res.code === 0) {
          const myModal = bootstrap.Modal.getOrCreateInstance("#modalSocial")
          ElMessage({
            type: "success",
            message: "Success",
          })
          myModal.hide()
          fetchKnowTaskList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        modalSocialLoading.value = false
      }
    } else {
      console.log("error submit!", fields)
    }
  })
}
// 社媒表单数据
const formDataSocial = reactive({
  name: "",
})
const rulesSocial = reactive({
  name: [{ required: true, message: "Please input", trigger: "blur" }],
})

// copy邀请url
function handleCopyInviteUrl() {
  try {
    copyToClipboard(`${appUrl}/?inviteAddress=${dataInfo.value.address}`)
    ElMessage({
      type: "success",
      message: "Success",
    })
  } catch (error) {
    ElMessage({
      type: "warning",
      message: "Please manually copy",
    })
  }
}

// const tableData = [
//   {
//     taskText:
//       "Follow @unisrc20 on Twitter and report your wallet address to @unisrc20.",
//     points: "10",
//     taskLink: "https://twitter.com/unisrc20",
//   },
//   {
//     taskText:
//       "Join @unisrc20 on Discord and report your wallet address to @unisrc20.",
//     points: "10",
//     taskLink: "https://t.co/eVNMU1QQ0I",
//   },
//   {
//     taskText:
//       "Join @unisrc20 on Telegram and report your wallet address to @unisrc20.",
//     points: "10",
//     taskLink: "https://t.me/unisrc20",
//   },
//   {
//     taskText: "Deploy a BRC20 token in Unisrc20.",
//     points: "50",
//     taskLink: "/#/inscribe",
//   },
//   {
//     taskText: "Mint a BRC20 token in Unisrc20.",
//     points: "50",
//     taskLink: "/#/inscribe",
//   },
//   {
//     taskText: "Buy a BRC20 token in Unisrc20.",
//     points: "50",
//     taskLink: "",
//   },
// ]
</script>

<style lang="scss" scoped>
.banner-title-font {
  font-size: 3rem;
}
</style>
