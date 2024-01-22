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
          <el-table-column fixed prop="ticker" label="Ticker" width="110" />
          <el-table-column :label="$t('pages.pageL2.Progress')" width="180">
            <template #default="scope"> {{ scope.row.rate }} % </template>
          </el-table-column>
          <el-table-column
            prop="createdAtFormat"
            :label="$t('pages.pageL2.DeployTime')"
            width="auto"
          />
          <el-table-column
            prop="holders"
            :label="$t('pages.pageL2.Holders')"
            width="180"
          />
          <el-table-column
            fixed="right"
            :label="$t('pages.pageL2.Action')"
            width="130"
          >
            <template #default="">
              <button type="button" class="btn btn-sm btn-primary me-2">
                {{ $t("pages.pageL2.Mint") }}
              </button>
              <!-- <button type="button" class="btn btn-sm btn-secondary">
                Buy
              </button> -->
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
import { tickerList } from "@/api/server-api.js"
import { listFormat } from "@/utils/list-format.js"

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
    tableData.value = res.data.list
    listFormat(tableData.value)
  } catch (error) {
    console.log(error)
  }
}
// 表格数据
const tableData = ref([])
</script>

<style scoped></style>
