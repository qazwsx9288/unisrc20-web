<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">Brc20 L2</h2>

      <!-- 搜索 -->
      <div class="input-group pb-2 pb-lg-3">
        <input type="text" class="form-control" placeholder="Sreach Tips" />
        <button class="btn btn-outline-primary" type="button">
          {{ $t("pages.pageL2.Search") }}
        </button>
      </div>

      <!-- 筛选 -->
      <div class="py-3">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <button
              :class="{ active: filter === '1' }"
              class="nav-link"
              type="button"
              @click="handleFilterChange('1')"
            >
              {{ $t("pages.pageL2.All") }}
            </button>
          </li>
          <li class="nav-item">
            <button
              :class="{ active: filter === '2' }"
              class="nav-link"
              type="button"
              @click="handleFilterChange('2')"
            >
              {{ $t("pages.pageL2.InProgress") }}
            </button>
          </li>
          <li class="nav-item">
            <button
              :class="{ active: filter === '3' }"
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
      <div>
        <el-table class="rounded" :data="tableData" style="width: 100%">
          <el-table-column fixed prop="name" label="Ticker" width="110" />
          <el-table-column
            prop="name"
            :label="$t('pages.pageL2.Progress')"
            width="180"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.pageL2.DeployTime')"
            width="auto"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.pageL2.Holders')"
            width="180"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.pageL2.Transactions')"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

// 表格数据
const tableData = [
  {
    name: "Tom",
  },
]

// 1 all, 2 inprogress, 3 completed
const filter = ref("1")
function handleFilterChange(s) {
  filter.value = s
}
</script>

<style scoped></style>
