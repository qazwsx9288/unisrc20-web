import { defineStore } from "pinia"

export const useUserDic = defineStore("userDic", () => {
  const dicList = [
    {
      // 字段（被处理的list包含此key，则会自动按formatTable添加格式化字段）
      key: "deployStatus",
      // 对照表
      formatTable: [
        {
          value: [0, 1, 2, 3, 4, 5, 6, 57],
          text: "Waiting",
          elType: "warning",
        },
        { value: 7, text: "Success", elType: "success" },
      ],
    },
  ]

  return { dicList }
})
