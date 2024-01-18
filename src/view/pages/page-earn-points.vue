<template>
  <div class="page-min-h">
    <div class="container">
      <h2 class="m-0 py-3 py-lg-5 text-primary-emphasis">
        {{ $t("pages.pageEarnPoints.EarnPoints") }}
      </h2>

      <div>
        <div class="pb-3">
          <img class="w-100" src="@/assets/img/earn-points-1.svg" alt="" />
        </div>

        <div class="pb-3">
          <div class="fs-4 pb-3">
            {{ $t("pages.pageEarnPoints.COMPLETETASKSEARNPOINTS") }}
          </div>
          <span class="bg-primary text-light p-2 rounded">
            {{ $t("pages.pageEarnPoints.MyTotalPoints") }}: 0
          </span>
        </div>

        <div class="pb-3">
          <el-table
            class="rounded"
            size="large"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              fixed
              :label="$t('pages.pageEarnPoints.Task')"
              width="auto"
            >
              <template #default="scope">
                {{ scope.row.taskText }}
              </template>
            </el-table-column>

            <el-table-column
              fixed
              prop="points"
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
                  v-if="scope.row.taskLink"
                  type="button"
                  :href="scope.row.taskLink"
                  target="_blank"
                  class="btn btn-sm btn-primary me-2"
                >
                  To do it
                </a>
                <span v-if="!scope.row.taskLink">Comming Soon</span>
                <!-- <span>Completed</span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="pb-3">
          <div class="fs-4 pb-3">
            {{ $t("pages.pageEarnPoints.Getmorepointsbyinvitingyourfriends") }}
          </div>
          <div class="pb-3">
            <span class="bg-primary text-light p-2 rounded">
              {{ $t("pages.pageEarnPoints.Pointsbyinvited") }}: 0
            </span>
          </div>

          <div class="border p-3 rounded">
            <div class="fs-5 pb-3">
              {{ $t("pages.pageEarnPoints.CopythisURLtoyourfriends") }} (10
              Points per invited)
            </div>
            <div class="text-break">
              <span>https://app.unisrc20.com/code=abasbdawdoajsdkl</span>
              <button class="btn btn-primary btn-sm ms-2" type="button">
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
import { ref } from "vue"

// 表格数据
const tableData = [
  {
    taskText:
      "Follow @unisrc20 on Twitter and report your wallet address to @unisrc20.",
    points: "10",
    taskLink: "https://twitter.com/unisrc20",
  },
  {
    taskText:
      "Join @unisrc20 on Discord and report your wallet address to @unisrc20.",
    points: "10",
    taskLink: "https://t.co/eVNMU1QQ0I",
  },
  {
    taskText:
      "Join @unisrc20 on Telegram and report your wallet address to @unisrc20.",
    points: "10",
    taskLink: "https://t.me/unisrc20",
  },
  {
    taskText: "Deploy a BRC20 token in Unisrc20.",
    points: "50",
    taskLink: "/#/inscribe",
  },
  {
    taskText: "Mint a BRC20 token in Unisrc20.",
    points: "50",
    taskLink: "/#/inscribe",
  },
  {
    taskText: "Buy a BRC20 token in Unisrc20.",
    points: "50",
    taskLink: "",
  },
]
</script>

<style lang="scss" scoped></style>
