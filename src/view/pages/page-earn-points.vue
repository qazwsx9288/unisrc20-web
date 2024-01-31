<template>
  <div class="page-min-h">
    <div class="container">
      <div>
        <div class="py-5 gx-5 row">
          <img
            class="col-12 col-md-6"
            src="@/assets/img/earn-points-1.svg"
            alt=""
          />
          <div class="col-12 col-md-6">
            <div class="banner-title-font">
              {{ $t("pages.pageEarnPoints.COMPLETETASKSEARNPOINTS") }}
            </div>

            <div class="py-3">
              <span class="bg-primary fs-4 text-light p-2 me-3 rounded">
                {{ $t("pages.pageEarnPoints.MyTotalPoints") }}:
                {{ dataInfo.taskScore }}
              </span>

              <!-- TODO:接入API -->
              <span class="bg-primary fs-4 text-light p-2 rounded">
                {{ $t("pages.pageEarnPoints.MyRank") }}: 0
              </span>
            </div>
          </div>
        </div>

        <div class="fs-4 fw-bold pb-3 text-primary">
          Know UniSRC20 (Get 30 Points)
        </div>

        <div class="pb-3">
          <el-table
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

        <div class="fs-4 fw-bold pb-3 text-primary">
          Try L2 UniSRC20 (Get 150 Points)
        </div>

        <div class="pb-3">
          <el-table
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
              {{ $t("pages.pageEarnPoints.CopythisURLtoyourfriends") }} (10
              Points per invited)
            </div>
            <div class="text-break">
              <span>{{
                `https://app.unisrc20.com/?inviteAddress=${dataInfo.address}`
              }}</span>
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
  </div>
</template>

<script setup>
// TODO：任务分3个模块，添加排名页
import { ref, onMounted, onBeforeUnmount, computed } from "vue"
import { getTaskList } from "@/api/server-api.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { copyToClipboard } from "@/utils/helper.js"
import bus from "vue3-eventbus"
import { ElMessage } from "element-plus"

const web3Wallet = useWeb3Wallet()

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
async function fetchKnowTaskList() {
  const res = await getTaskList({
    taskType: "1",
  })
  // 获取信息
  knowTaskList.value = res.data.result.task
}

// try列表
const tryTaskList = ref([])
async function fetchTryTaskList() {
  const res = await getTaskList({
    taskType: "2",
  })
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

function handleCopyInviteUrl() {
  try {
    copyToClipboard(
      `https://app.unisrc20.com/?inviteAddress=${dataInfo.value.address}`
    )
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
