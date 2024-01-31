<template>
  <div class="page-min-h">
    <div class="container">
      <!-- banner -->
      <div class="py-3 gx-5 row">
        <img
          class="col-12 col-md-5"
          src="@/assets/img/earn-points-rank-1.svg"
          alt=""
        />
        <div class="col-12 col-md-7">
          <div class="banner-title-font">EARN POINTS GAIN REWARDS</div>

          <div class="py-3">
            <button
              type="button"
              class="btn btn-lg btn-primary"
              @click="handleGoEarnPoints"
            >
              <span>Earn Points ></span>
            </button>
          </div>
        </div>
      </div>
      <!-- banner end -->

      <div class="fs-3 fw-bold pb-3 text-primary">LeaderBoard</div>

      <div>
        <el-table
          class="rounded"
          size="large"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            fixed
            :label="$t('pages.pageEarnPointsRank.Rank')"
            width="180"
          >
            <template #default="scope">
              {{ scope.row.rank }}
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            :label="$t('pages.pageEarnPointsRank.Address')"
            width="auto"
          />

          <el-table-column
            prop="invite"
            :label="$t('pages.pageEarnPointsRank.Invited')"
            width="180"
          />

          <el-table-column
            fixed="right"
            prop="point"
            :label="$t('pages.pageEarnPointsRank.Points')"
            width="auto"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO：添加排名页
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { copyToClipboard } from "@/utils/helper.js"
import bus from "vue3-eventbus"
import { ElMessage } from "element-plus"

const router = useRouter()
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
async function init() {}

const tableData = ref([
  {
    rank: 1,
    address: "asdasdasdasdasdasdasdasdasdasdasasdasdasd",
    invite: 20,
    point: 100,
  },
])

// 导航
function handleGoEarnPoints() {
  router.push({ name: "earn-points" })
}
</script>

<style lang="scss" scoped>
.banner-title-font {
  font-size: 3rem;
}
</style>
