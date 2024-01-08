<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.my.pageMyDeployOrder.DeployOrder") }}
      </h2>

      <!-- 表格 -->
      <div>
        <el-table class="rounded" :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="Ticker" width="auto" />
          <el-table-column prop="name" label="Hash" width="auto" />
          <el-table-column
            prop="name"
            :label="$t('pages.my.pageMyDeployOrder.Total')"
            width="auto"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.my.pageMyDeployOrder.Fee')"
            width="auto"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.my.pageMyDeployOrder.Time')"
            width="auto"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.my.pageMyDeployOrder.Status')"
            width="auto"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
const tableData = [
  {
    name: "Tom",
  },
]
</script>

<style scoped></style>
