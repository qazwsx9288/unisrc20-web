import { defineStore } from "pinia"

export const useUserDic = defineStore("userDic", () => {
  const dicList = [
    // {
    //   // 字段（被处理的list包含此key，则会自动按formatTable添加格式化字段）
    //   key: 'goodsStatus',
    //   // 对照表
    //   formatTable: [
    //     { value: 1, text: '待审核', elType: 'warning' },
    //   ],
    // },
  ]

  return { dicList }
})
