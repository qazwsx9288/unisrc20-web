<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.my.pageMyDeployOrder.DeployOrder") }}
      </h2>

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

          <el-table-column label="Hash" width="120">
            <template #default="scope">
              <a :href="scope.row.deployHashUrl" target="_blank">{{
                scope.row.deployHashFormat
              }}</a>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('pages.my.pageMyDeployOrder.Fee')"
            width="120"
          >
            <template #default="scope">
              {{ scope.row.totalPay }} USDT
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('pages.my.pageMyDeployOrder.Status')"
            width="180"
          >
            <template #default="scope">
              <el-tag
                class="ml-2"
                :type="scope.row.deployStatusFormatElType || ''"
                >{{ scope.row.deployStatusFormat }}</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column
            prop="createdAtFormat"
            :label="$t('pages.my.pageMyDeployOrder.Time')"
            width="200"
          />

          <el-table-column
            prop="totalSupply"
            :label="$t('pages.my.pageMyDeployOrder.Total')"
            width="auto"
          />
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
import { getAllOrder } from "@/api/server-api.js"
import { listFormat } from "@/utils/list-format.js"

onMounted(() => {
  init()
})

// init
async function init() {
  fetchList({})
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
    const res = await getAllOrder({
      page: page,
      pageSize: pageSize.value,
    })
    console.log(res)
    total.value = res.data.total
    tableData.value = res.data.list.map((cur) => {
      cur.ticker = cur.ticker.toUpperCase()

      cur.deployStatus = cur.status

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
</script>

<style scoped></style>
