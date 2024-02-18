<template>
  <div class="page-min-h">
    <div class="container pb-5">
      <!-- banner -->
      <div class="py-5 gx-5 row">
        <img
          class="col-12 col-md-4"
          src="@/assets/img/earn-points-rank-1.svg"
          alt=""
        />

        <!-- 占位 -->
        <div class="col-12 col-md-2"></div>

        <div class="col-12 col-md-6 text-center text-md-start">
          <div class="banner-title-font">
            {{ $t("pages.pageEarnPointsRank.EARN POINTS") }}
          </div>
          <div class="banner-title-font">
            {{ $t("pages.pageEarnPointsRank.GAIN REWARDS") }}
          </div>
          <div class="pt-5">
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

      <!-- table LeaderBoard -->
      <div class="fs-1 fw-bold pb-3 text-primary">LeaderBoard</div>

      <div class="pb-5">
        <el-table
          v-loading="fetchListLoading"
          class="pb-3 rounded"
          size="large"
          :data="tableData"
          @sort-change="handleSortChange"
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
            :sort-orders="['descending', null]"
            sortable="custom"
            prop="inviteScore"
            :label="$t('pages.pageEarnPointsRank.Invited')"
            width="220"
          />

          <el-table-column
            :sort-orders="['descending', null]"
            sortable="custom"
            fixed="right"
            prop="totalScore"
            :label="$t('pages.pageEarnPointsRank.Points')"
            width="auto"
          />
        </el-table>

        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :background="true"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- table LeaderBoard end -->

      <!-- Recently Joined -->
      <div v-if="joinList?.length > 0">
        <div class="fs-4 fw-bold pb-3 text-primary">Recently Joined</div>

        <div class="row gy-3">
          <div v-for="(item, index) in joinList" :key="index" class="col-12">
            <div class="p-3 border rounded row">
              <div class="col-12 col-md-7">{{ item.invite }}</div>
              <div class="col-3 col-md-2">Joined</div>
              <div class="col-9 col-md-2">{{ item.timeFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Recently Joined end -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
import { copyToClipboard } from "@/utils/helper.js"
import bus from "vue3-eventbus"
import { ElMessage } from "element-plus"
import { getInviteOrder, getInviteLatest } from "@/api/server-api.js"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

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
async function init() {
  currentPage.value = 1
  fetchList()
  fetchJoinList()
}

const tableData = ref([])
// 排序钩子
function handleSortChange(val) {
  const orderDic = {
    descending: "desc",
    ascending: "asc",
  }

  const propDic = {
    inviteScore: "invite_score",
    totalScore: "total_score",
  }

  const param = {
    prop: propDic[val.prop],
    order: orderDic[val.order],
  }
  fetchList(param)
}
// page
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  currentPage.value = val
  fetchList()
}
// 获取列表
const fetchListLoading = ref(false)
async function fetchList(param) {
  let reqData = {
    page: param?.page || currentPage.value,
    pageSize: param?.pageSize || pageSize.value,
  }

  if (param?.order) {
    reqData = {
      ...reqData,
      ...param,
    }
  }

  fetchListLoading.value = true
  let res
  try {
    res = await getInviteOrder(reqData)
  } catch (error) {
    console.log(error)
  } finally {
    fetchListLoading.value = false
  }
  // 获取信息
  total.value = res.data.total
  tableData.value = res.data.list
}

// 近期加入
const joinList = ref([])
// 获取近期加入列表
async function fetchJoinList() {
  const res = await getInviteLatest({ limit: 3 })
  joinList.value = res.data.result.map((cur) => {
    cur.timeFormat = dayjs(cur.createdAt).fromNow()
    return cur
  })
}

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
