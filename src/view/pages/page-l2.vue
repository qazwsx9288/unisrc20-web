<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">Brc20 L2</h2>

      <!-- 搜索 -->
      <div class="input-group pb-2 pb-lg-3">
        <input
          v-model="searchContent"
          type="text"
          class="form-control"
          placeholder="Sreach Tips"
          @keypress.enter="handleSearch"
        />
        <button
          class="btn btn-outline-primary"
          type="button"
          @click="handleSearch"
        >
          {{ $t("pages.pageL2.Search") }}
        </button>
      </div>

      <!-- 筛选 -->
      <div class="py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <button
              :class="{ active: curStatus === '1' }"
              class="nav-link"
              type="button"
              @click="handleFilterChange('1')"
            >
              {{ $t("pages.pageL2.All") }}
            </button>
          </li>
          <li class="nav-item">
            <button
              :class="{ active: curStatus === '2' }"
              class="nav-link"
              type="button"
              @click="handleFilterChange('2')"
            >
              {{ $t("pages.pageL2.InProgress") }}
            </button>
          </li>
          <li class="nav-item">
            <button
              :class="{ active: curStatus === '3' }"
              class="nav-link"
              type="button"
              @click="handleFilterChange('3')"
            >
              {{ $t("pages.pageL2.Completed") }}
            </button>
          </li>
        </ul>
      </div>

      <!-- 表格 -->
      <div class="pb-3">
        <el-table class="rounded" :data="tableData" style="width: 100%">
          <el-table-column fixed label="Ticker" width="130">
            <template #default="scope">
              <el-link @click="handleGoInfo(scope.row.ticker)" type="primary">
                <img
                  v-if="scope.row.logoBase64"
                  class="me-2 rounded-circle"
                  style="width: 25px; height: 25px"
                  :src="scope.row.logoBase64"
                  alt=""
                />

                <span>{{ scope.row.ticker }}</span>
              </el-link>
            </template>
          </el-table-column>

          <el-table-column
            prop="holders"
            :label="$t('pages.pageL2.Holders')"
            width="120"
          />

          <el-table-column :label="$t('pages.pageL2.Progress')" width="180">
            <template #default="scope">
              <el-progress :percentage="scope.row.rate" />
            </template>
          </el-table-column>

          <el-table-column :label="$t('pages.pageL2.Information')" width="160">
            <template #default="scope">
              <a
                v-if="scope.row.projectUrl"
                class="me-1"
                target="_blank"
                :href="scope.row.projectUrl"
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
                v-if="scope.row.twitter"
                class="me-1"
                target="_blank"
                :href="scope.row.twitter"
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
                v-if="scope.row.github"
                class="me-1"
                target="_blank"
                :href="scope.row.github"
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
                v-if="scope.row.telegram"
                class="me-1"
                target="_blank"
                :href="scope.row.telegram"
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
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('pages.pageL2.Market Cap($)')"
            width="180"
          >
            <template #default="scope"> - </template>
          </el-table-column>

          <el-table-column
            prop="max"
            :label="$t('pages.pageL2.Max')"
            width="auto"
          />

          <el-table-column
            fixed="right"
            :label="$t('pages.pageL2.Action')"
            width="130"
          >
            <template #default="scope">
              <button
                :disabled="scope.row.rate >= 100"
                type="button"
                class="btn btn-sm btn-primary me-2"
                @click="handleMint(scope.row)"
              >
                {{ $t("pages.pageL2.Mint") }}
              </button>
              <button type="button" disabled class="btn btn-sm btn-secondary">
                {{ $t("pages.pageL2.Buy") }}
              </button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="true"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { tickerList } from "@/api/server-api.js"
import { listFormat } from "@/utils/list-format.js"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"

const router = useRouter()
const web3Wallet = useWeb3Wallet()

onMounted(() => {
  init()
})

// init
async function init() {
  fetchList({})
}

// 搜索框内容
const searchContent = ref("")
async function handleSearch() {
  init()
}
// 1 all, 2 inprogress, 3 completed
const curStatus = ref("1")
function handleFilterChange(s) {
  curStatus.value = s
  init()
}
// page
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  fetchList({ page: val })
}
// 获取列表
async function fetchList({ page = currentPage.value }) {
  try {
    const res = await tickerList({
      page: page,
      pageSize: pageSize.value,
      type: curStatus.value,
      search: searchContent.value,
    })
    console.log(res)
    total.value = res.data.total
    tableData.value = res.data.list.map((cur) => {
      cur.ticker = cur.ticker.toUpperCase()

      // 合约地址格式化
      if (cur.contract) {
        cur.contractHashUrl = `${
          import.meta.env.VITE_BASE_OKTC_SCAN_URL
        }/address/${cur.contract}`

        cur.contractHashFormat = `
        ${cur.contract.slice(0, 3)}
        ...
        ${cur.contract.slice(-4, cur.contract.length)}
        `
        cur.deployStatus = cur.status
      } else {
        cur.contractHashUrl = ""
        cur.contractHashFormat = ""
      }

      // L1铭文地址格式化
      if (cur.deploy) {
        cur.deployHashUrl = `${import.meta.env.VITE_BASE_BTC_SCAN_URL}/tx/${
          cur.deploy
        }`

        cur.deployHashFormat = `
        ${cur.deploy.slice(0, 3)}
        ...
        ${cur.deploy.slice(-4, cur.deploy.length)}
        `
      } else {
        cur.deployHashUrl = ""
        cur.deployHashFormat = ""
      }

      return cur
    })

    listFormat(tableData.value)
  } catch (error) {
    console.log(error)
  }
}
// 表格数据
const tableData = ref([])

// mint
async function handleMint(item) {
  await web3Wallet.mintL2(item.contract, item.ticker)
}

// 前往详情
function handleGoInfo(ticker) {
  router.push({ name: "l2-info", query: { ticker: ticker } })
}
</script>

<style scoped></style>
