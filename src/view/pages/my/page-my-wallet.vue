<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.my.pageMyWallet.MyWallet") }}
      </h2>

      <div class="mb-3">
        <el-link type="primary" @click="handleGoDeployOrder">
          {{ $t("pages.my.pageMyWallet.Check My Deploy Orders") }}
        </el-link>
      </div>

      <!-- 表格 -->
      <div class="pb-3">
        <div class="d-flex align-items-center">
          <div class="me-1">
            {{ $t("pages.my.pageMyWallet.HideEmptyAssets") }}
          </div>
          <el-switch
            v-model="isHideZero"
            @change="handleIsHideZeroChange"
            active-value="1"
            inactive-value="0"
          />
        </div>
      </div>

      <div>
        <el-table class="rounded" :data="tableDataView" style="width: 100%">
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
            :label="$t('pages.my.pageMyWallet.Contract')"
            width="120"
          >
            <template #default="scope">
              <a :href="scope?.row?.contractUrl" target="_blank">{{
                scope?.row?.contractFormat
              }}</a>
            </template>
          </el-table-column>

          <el-table-column
            prop="balance"
            :label="$t('pages.my.pageMyWallet.Balance')"
            width="auto"
          />
          <el-table-column
            fixed="right"
            :label="$t('pages.my.pageMyWallet.Action')"
            width="160"
          >
            <template #default="scope">
              <!-- <button type="button" class="btn btn-sm btn-primary me-2">
                {{ $t("pages.my.pageMyWallet.Send") }}
              </button> -->
              <button
                type="button"
                class="btn btn-sm btn-primary me-2"
                @click="handleAddTokenToWallet(scope.row)"
              >
                {{ $t("pages.my.pageMyWallet.Add") }}
              </button>
              <button
                type="button"
                disabled
                class="btn btn-sm btn-secondary me-2"
              >
                {{ $t("pages.my.pageMyWallet.Buy") }}
              </button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :background="true"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { tickerList } from "@/api/server-api.js"
import { listFormat } from "@/utils/list-format.js"
import { contractConfig } from "@/contract/contract.js"
import { ethers } from "ethers"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { ElMessage } from "element-plus"

const web3Wallet = useWeb3Wallet()
const router = useRouter()

onMounted(() => {
  isHideZero.value = localStorage.getItem("isHideZero") || "1"
  init()
})

// init
async function init() {
  fetchList({})
}

// 空资产
const isHideZero = ref("1")
function handleIsHideZeroChange(val) {
  localStorage.setItem("isHideZero", val)
}

// page
const currentPage = ref(1)
const pageSize = ref(99999)
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
      type: "1",
    })
    console.log(res)
    total.value = res.data.total

    tableData.value = res.data.list.map((cur) => {
      cur.ticker = cur.ticker.toUpperCase()
      if (cur.contract) {
        cur.contractUrl = `${import.meta.env.VITE_BASE_OKTC_SCAN_URL}/address/${
          cur.contract
        }`

        cur.contractFormat = `
        ${cur.contract.slice(0, 3)}
        ...
        ${cur.contract.slice(-4, cur.contract.length)}
        `
      } else {
        cur.contractUrl = ""
        cur.contractFormat = ""
      }

      cur.balance = "0"
      return cur
    })

    // 获取余额
    // TODO:测试并发
    const signer = await web3Wallet.getSigner()
    if (signer?.error) {
      return
    }

    tableData.value.forEach(async (cur) => {
      const contractUSDT = new ethers.Contract(
        cur.contract,
        contractConfig.abi.L2TOKEN,
        signer
      )

      Promise.all([
        contractUSDT.balanceOf(web3Wallet.userWallet.address),
        contractUSDT.decimals(),
      ]).then((resArr) => {
        const balance = resArr[0]
        const decimals = resArr[1]
        const formattedBalance = ethers.utils.formatUnits(balance, decimals)
        cur.balance = parseFloat(formattedBalance).toFixed(4)
      })
    })
  } catch (error) {
    console.log(error)
  }
}
// 表格数据
const tableData = ref([])
// 表格展示数据
const tableDataView = computed(() => {
  if (isHideZero.value === "1") {
    return tableData.value.filter((cur) => {
      if (["0", "0.0000"].includes(cur.balance)) {
        return false
      } else {
        return true
      }
    })
  } else {
    return tableData.value
  }
})

// 转到部署订单
function handleGoDeployOrder() {
  router.push({ name: "deploy-order" })
}

// 添加代币
async function handleAddTokenToWallet(item) {
  try {
    await web3Wallet.addTokenToWallet(item.contract, item.ticker, item.dec)
  } catch (error) {
    ElMessage({
      type: "warning",
      message: error.message || "Error",
    })
    console.log(error)
  }
}
</script>

<style scoped></style>
