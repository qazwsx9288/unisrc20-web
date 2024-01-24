<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.my.pageMyWallet.MyWallet") }}
      </h2>

      <!-- 表格 -->
      <div class="pb-3">
        <div class="d-flex align-items-center">
          <div class="me-1">
            {{ $t("pages.my.pageMyWallet.HideEmptyAssets") }}
          </div>
          <el-switch v-model="isHideZero" />
        </div>
      </div>
      <div>
        <el-table class="rounded" :data="tableData" style="width: 100%">
          <el-table-column
            prop="name"
            :label="$t('pages.my.pageMyWallet.Symbol')"
            width="auto"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.my.pageMyWallet.Contract')"
            width="auto"
          />
          <el-table-column
            prop="name"
            :label="$t('pages.my.pageMyWallet.Balance')"
            width="auto"
          />
          <!-- <el-table-column
            fixed="right"
            :label="$t('pages.my.pageMyWallet.Action')"
            width="130"
          >
            <template #default="scope">
              <button type="button" class="btn btn-sm btn-primary me-2">
                {{ $t("pages.my.pageMyWallet.Send") }}
              </button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const isHideZero = ref(true)

const tableData = [
  {
    name: "Tom",
  },
]
</script>

<style scoped></style>
