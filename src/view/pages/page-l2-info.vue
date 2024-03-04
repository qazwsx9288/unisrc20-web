<template>
  <div class="page-min-h">
    <div class="container pb-5">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.pageL2Info.InscriptionInfo") }}
      </h2>

      <!-- top -->
      <div class="row">
        <!-- ticker name -->
        <div class="col-12 col-md-3">
          <div>
            <img
              v-if="tickerInfo.logoBase64"
              class="me-2 rounded-circle"
              style="width: 25px; height: 25px"
              :src="tickerInfo.logoBase64"
              alt=""
            />

            <span class="fw-bold fs-5 me-2">{{ tickerInfo?.ticker }}</span>

            <a
              v-if="tickerInfo.projectUrl"
              class="me-1"
              target="_blank"
              :href="tickerInfo.projectUrl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-globe2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855q-.215.403-.395.872c.705.157 1.472.257 2.282.287zM4.249 3.539q.214-.577.481-1.078a7 7 0 0 1 .597-.933A7 7 0 0 0 3.051 3.05q.544.277 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9 9 0 0 1-1.565-.667A6.96 6.96 0 0 0 1.018 7.5zm1.4-2.741a12.3 12.3 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.3 12.3 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.6 13.6 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696q.18.469.395.872c.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a7 7 0 0 1-.598-.933 9 9 0 0 1-.481-1.079 8.4 8.4 0 0 0-1.198.49 7 7 0 0 0 2.276 1.522zm-1.383-2.964A13.4 13.4 0 0 1 3.508 8.5h-2.49a6.96 6.96 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667m6.728 2.964a7 7 0 0 0 2.275-1.521 8.4 8.4 0 0 0-1.197-.49 9 9 0 0 1-.481 1.078 7 7 0 0 1-.597.933M8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855q.216-.403.395-.872A12.6 12.6 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.96 6.96 0 0 0 14.982 8.5h-2.49a13.4 13.4 0 0 1-.437 3.008M14.982 7.5a6.96 6.96 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461q.266.502.482 1.078a8.4 8.4 0 0 0 1.196-.49 7 7 0 0 0-2.275-1.52c.218.283.418.597.597.932m-.488 1.343a8 8 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"
                />
              </svg>
            </a>

            <a
              v-if="tickerInfo.twitter"
              class="me-1"
              target="_blank"
              :href="tickerInfo.twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-twitter"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15"
                />
              </svg>
            </a>

            <a
              v-if="tickerInfo.github"
              class="me-1"
              target="_blank"
              :href="tickerInfo.github"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                />
              </svg>
            </a>

            <a
              v-if="tickerInfo.telegram"
              class="me-1"
              target="_blank"
              :href="tickerInfo.telegram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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

          <div>
            <el-link @click="handleAddTokenToWallet" type="primary">
              {{ $t("pages.pageL2Info.AddTokentoWallet") }}
            </el-link>
          </div>
        </div>

        <!-- ticker name end -->

        <!-- address -->
        <div class="col-12 col-md-9">
          <div>
            <img
              style="width: 1rem; height: 1rem"
              class="me-2"
              src="@/assets/img/icon-btc.png"
            />
            <span>L1 Address: </span>

            <a class="me-2" :href="tickerInfo.deployHashUrl" target="_blank">
              {{ tickerInfo.deployHashFormat }}
            </a>

            <span class="cursor-pointer" @click="handleCopy(tickerInfo.deploy)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-copy"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                />
              </svg>
            </span>
          </div>

          <div>
            <img
              style="width: 1rem; height: 1rem"
              class="me-2"
              src="@/assets/img/icon-l2-info.png"
            />
            <span>L2 Address: </span>

            <a class="me-2" :href="tickerInfo.contractHashUrl" target="_blank">
              {{ tickerInfo.contractHashFormat }}
            </a>

            <span
              class="cursor-pointer"
              @click="handleCopy(tickerInfo.contract)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-copy"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                />
              </svg>
            </span>
          </div>
        </div>
        <!-- address end -->
      </div>
      <!-- top end -->

      <el-divider></el-divider>

      <!-- overview -->
      <div class="row gx-3 gy-3 overflow-hidden text-center">
        <div
          class="col-md-4 col-6"
          v-for="(item, index) in overviewList"
          :key="index"
        >
          <div class="p-3 border rounded">
            <div class="text-secondary">{{ item.label }}</div>
            <div>{{ item.value }}</div>
          </div>
        </div>

        <!-- progress -->
        <div class="col-md-4 col-6">
          <div class="p-3 border rounded">
            <div class="text-secondary">
              {{ $t("pages.pageL2Info.Progress") }}
            </div>
            <div style="height: 24px">
              <el-progress :percentage="tickerInfo.rate" />
            </div>
          </div>
        </div>
      </div>
      <!-- overview end -->

      <!-- table -->
      <div>
        <!-- 筛选 -->
        <div
          class="pb-3 pt-5 d-flex items-center justify-content-between justify-content-lg-start"
        >
          <div class="btn-group me-4" role="group">
            <button
              type="button"
              :class="{ active: tableMode === '1' }"
              class="btn btn-outline-primary"
              @click="handletableModeChange('1')"
            >
              {{ $t("pages.pageL2Info.Holders") }}
            </button>
            <button
              type="button"
              :class="{ active: tableMode === '2' }"
              class="btn btn-outline-primary"
              @click="handletableModeChange('2')"
            >
              {{ $t("pages.pageL2Info.Transactions") }}
            </button>
          </div>

          <div>
            <button
              :disabled="tickerInfo.max === tickerInfo.totalSupply"
              type="button"
              class="btn btn-primary me-2"
              @click="handleMint"
            >
              {{ $t("pages.pageL2Info.Mint") }}
            </button>
          </div>
        </div>

        <!-- holderList -->
        <div v-if="tableMode === '1'">
          <el-table
            v-loading="fetchHolderListLoading"
            class="rounded"
            :data="holderList"
            style="width: 100%"
          >
            <el-table-column
              fixed
              :label="$t('pages.pageL2Info.Address')"
              width="auto"
            >
              <template #default="scope">
                <a :href="scope.row.holderAddressUrl" target="_blank">
                  {{ scope.row.holderAddress }}
                </a>
              </template>
            </el-table-column>

            <el-table-column
              fixed
              :label="$t('pages.pageL2Info.Percent')"
              width="180"
            >
              <template #default="scope">
                <el-progress :percentage="scope.row.rate" />
              </template>
            </el-table-column>

            <el-table-column
              prop="value"
              :label="$t('pages.pageL2Info.Total')"
              width="auto"
            />
          </el-table>

          <el-pagination
            class="mt-3"
            v-model:current-page="currentPageHolder"
            v-model:page-size="pageSizeHolder"
            :background="true"
            layout="prev, pager, next, jumper"
            :total="totalHolder"
            @current-change="handleCurrentPageHolderChange"
          />
        </div>
        <!-- holderList end -->

        <!-- transactionList -->
        <div v-if="tableMode === '2'">
          <el-table
            v-loading="transactionListLoading"
            class="rounded"
            :data="transactionList"
            style="width: 100%"
          >
            <el-table-column
              fixed
              :label="$t('pages.pageL2Info.Hash')"
              width="220"
            >
              <template #default="scope">
                <a :href="scope.row.txhashUrl" target="_blank">
                  {{ scope.row.txhashFormat }}
                </a>
              </template>
            </el-table-column>

            <el-table-column
              prop="blockHeight"
              :label="$t('pages.pageL2Info.Block')"
              width="120"
            />

            <el-table-column
              fixed
              :label="$t('pages.pageL2Info.Time')"
              width="180"
            >
              <template #default="scope">
                {{ scope.row.createdAtFormat }}
              </template>
            </el-table-column>

            <el-table-column :label="$t('pages.pageL2Info.From')" width="220">
              <template #default="scope">
                <a :href="scope.row.fromUrl" target="_blank">
                  {{ scope.row.fromFormat }}
                </a>
              </template>
            </el-table-column>

            <el-table-column :label="$t('pages.pageL2Info.To')" width="220">
              <template #default="scope">
                <a :href="scope.row.toUrl" target="_blank">
                  {{ scope.row.toFormat }}
                </a>
              </template>
            </el-table-column>

            <el-table-column
              prop="value"
              :label="$t('pages.pageL2Info.Value')"
              :fixed="'right'"
              width="auto"
            />
          </el-table>

          <el-pagination
            class="mt-3"
            v-model:current-page="currentPageTransaction"
            v-model:page-size="pageSizeTransaction"
            :background="true"
            layout="prev, pager, next, jumper"
            :total="totalTransaction"
            @current-change="handleCurrentPageTransactionChange"
          />
        </div>
        <!-- transactionList end -->
      </div>
      <!-- table end -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import {
  orderMsg,
  getHolders,
  getContractTransactions,
} from "@/api/server-api.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { ElMessage } from "element-plus"
import dayjs from "dayjs"
import { useI18n } from "vue-i18n"
import { copyToClipboard } from "@/utils/helper.js"
import { listFormat } from "@/utils/list-format.js"

const i18n = useI18n()

const route = useRoute()
const web3Wallet = useWeb3Wallet()

// 页面参数
const queryParam = ref({})

onMounted(() => {
  queryParam.value = route.query
  init()
})

async function init() {
  fetchInfo()
  if (tableMode.value === "1") {
    currentPageHolder.value = 1
    fetchHolderList()
  } else {
    currentPageTransaction.value = 1
    totalTransaction.value = 0
    fetchTransactionList()
  }
}

// ticker信息
const tickerInfo = ref({})
async function fetchInfo() {
  const res = await orderMsg({
    ticker: queryParam.value.ticker,
  })
  tickerInfo.value = res.data.result

  if (tickerInfo.value.ticker) {
    // ticker格式化
    tickerInfo.value.ticker = tickerInfo.value.ticker.toUpperCase()

    // 时间格式化
    tickerInfo.value.createdAtFormat = dayjs(tickerInfo.value.createdAt).format(
      "YYYY-MM-DD HH:mm:ss"
    )

    // 合约地址格式化
    if (tickerInfo.value.contract) {
      tickerInfo.value.contractHashUrl = `${
        import.meta.env.VITE_BASE_OKTC_SCAN_URL
      }/address/${tickerInfo.value.contract}`

      tickerInfo.value.contractHashFormat = `
        ${tickerInfo.value.contract.slice(0, 12)}
        ...
        ${tickerInfo.value.contract.slice(
          -12,
          tickerInfo.value.contract.length
        )}
        `
      tickerInfo.value.deployStatus = tickerInfo.value.status
    } else {
      tickerInfo.value.contractHashUrl = ""
      tickerInfo.value.contractHashFormat = ""
    }

    // L1铭文地址格式化
    if (tickerInfo.value.deploy) {
      tickerInfo.value.deployHashUrl = `${
        import.meta.env.VITE_BASE_BTC_SCAN_URL
      }/tx/${tickerInfo.value.deploy}`

      tickerInfo.value.deployHashFormat = `
        ${tickerInfo.value.deploy.slice(0, 12)}
        ...
        ${tickerInfo.value.deploy.slice(-12, tickerInfo.value.deploy.length)}
        `
    } else {
      tickerInfo.value.deployHashUrl = ""
      tickerInfo.value.deployHashFormat = ""
    }
  } else {
    ElMessage({
      type: "warning",
      message: "Ticker does not exist",
    })
  }
}

// overview
const overviewList = computed(() => {
  const info = tickerInfo.value
  return [
    {
      label: i18n.t("pages.pageL2Info.Supply"),
      value: info.totalSupply || "0",
    },
    {
      label: i18n.t("pages.pageL2Info.LimitPerMint"),
      value: info.limit || "0",
    },
    {
      label: i18n.t("pages.pageL2Info.Holders"),
      value: info.holders || "0",
    },
    {
      label: i18n.t("pages.pageL2Info.Decimals"),
      value: info.dec || "0",
    },
    {
      label: i18n.t("pages.pageL2Info.DeployTime"),
      value: info.createdAtFormat || "0",
    },
  ]
})

// 切换2个table 1holders 2transactions
const tableMode = ref("1")
function handletableModeChange(val) {
  tableMode.value = val
  init()
}

// holders
const holderList = ref([])
const fetchHolderListLoading = ref(false)
async function fetchHolderList() {
  fetchHolderListLoading.value = true
  let res
  try {
    res = await getHolders({
      pageSize: pageSizeHolder.value,
      page: currentPageHolder.value,
      ticker: queryParam.value.ticker,
    })
  } catch (error) {
    console.log(error)
  } finally {
    fetchHolderListLoading.value = false
  }

  if (res.code !== 0) {
    return
  }

  totalHolder.value = res.data.result.total
  holderList.value =
    res.data.result?.list?.map((cur) => {
      // 地址格式化
      cur.holderAddressUrl = `${
        import.meta.env.VITE_BASE_OKTC_SCAN_URL
      }/address/${cur.holderAddress}`

      cur.holderAddressFormat = `
        ${cur.holderAddress.slice(0, 3)}
        ...
        ${cur.holderAddress.slice(-4, cur.holderAddress.length)}
        `

      return cur
    }) || []
}
// holder page
const currentPageHolder = ref(1)
const pageSizeHolder = ref(20)
const totalHolder = ref(0)
const handleCurrentPageHolderChange = (val) => {
  fetchHolderList({ page: val })
}

// transactions pages
const currentPageTransaction = ref(1)
const pageSizeTransaction = ref(20)
const totalTransaction = ref(0)
const handleCurrentPageTransactionChange = (val) => {
  fetchTransactionList({ page: val })
}
// 记录到达过的最大的页码 只因该接口无total
const maxPage = ref(1)
// transactions
const transactionList = ref([])
const transactionListLoading = ref(false)
async function fetchTransactionList() {
  transactionListLoading.value = true
  let res
  try {
    res = await getContractTransactions({
      pageSize: pageSizeTransaction.value,
      page: currentPageTransaction.value,
      ticker: queryParam.value.ticker,
    })
  } catch (error) {
    close.log(error)
  } finally {
    transactionListLoading.value = false
  }

  // 此接口无total返回，手动处理
  if (res.code === 0) {
    //  获取当前页面的条数
    const currentTotal = res.data.result?.list?.length || 0

    // 处理maxPage
    if (currentTotal > 0) {
      // 更新maxPage.value
      maxPage.value =
        maxPage.value < currentPageTransaction.value
          ? currentPageTransaction.value
          : maxPage.value
    }

    // 处理total
    totalTransaction.value = maxPage.value * pageSizeTransaction.value
    // 到达尾页时，如果当前条数为20 猜测有下一页。
    if (maxPage.value === currentPageTransaction.value && currentTotal === 20) {
      totalTransaction.value++
    }
  }

  transactionList.value =
    res.data?.result?.list?.map((cur) => {
      // 地址格式化
      cur.txhashUrl = `${import.meta.env.VITE_BASE_OKTC_SCAN_URL}/tx/${
        cur.txhash
      }`
      cur.txhashFormat = `
        ${cur.txhash.slice(0, 8)}
        ...
        ${cur.txhash.slice(-8, cur.txhash.length)}
        `

      cur.fromUrl = `${import.meta.env.VITE_BASE_OKTC_SCAN_URL}/address/${
        cur.from
      }`
      cur.fromFormat = `
        ${cur.from.slice(0, 8)}
        ...
        ${cur.from.slice(-8, cur.from.length)}
        `

      cur.toUrl = `${import.meta.env.VITE_BASE_OKTC_SCAN_URL}/address/${cur.to}`
      cur.toFormat = `
        ${cur.to.slice(0, 8)}
        ...
        ${cur.to.slice(-8, cur.txhash.length)}
        `

      // 赋值一个时间，让listFormat自动格式化
      cur.createdAt = cur.blockTime

      return cur
    }) || []

  listFormat(transactionList.value)
}

// mint
async function handleMint() {
  await web3Wallet.mintL2(tickerInfo.value.contract, tickerInfo.value.ticker)
}

// 添加代币
async function handleAddTokenToWallet() {
  try {
    await web3Wallet.addTokenToWallet(
      tickerInfo.value.contract,
      tickerInfo.value.ticker,
      tickerInfo.value.dec
    )
  } catch (error) {
    ElMessage({
      type: "warning",
      message: error.message || "Error",
    })
    console.log(error)
  }
}

function handleCopy(text) {
  try {
    copyToClipboard(text)
    ElMessage({
      type: "success",
      message: "Success",
    })
  } catch (error) {
    ElMessage({
      type: "warning",
      message: "Your browser is blocking copying",
    })
  }
}
</script>

<style scoped></style>
