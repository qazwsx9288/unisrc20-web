import { useUserDic } from "@/pinia/modules/user-dic-common.js"
import dayjs from "dayjs"

// 用户字典对象
const userDic = useUserDic()

// 将list中需要被格式化的字段，自动格式化
export function listFormat(list) {
  const dicList = userDic.dicList
  const keyList = userDic.dicList.map((cur) => {
    return cur.key
  })

  // 匹配字典中的key
  const hasKeyDicList = []
  for (const k in list[0]) {
    if (keyList.includes(k)) {
      dicList.forEach((cur) => {
        if (cur.key === k) {
          hasKeyDicList.push(cur)
        }
      })
    }
  }

  // 处理字典中的key的Format
  for (let i = 0; i < hasKeyDicList.length; i++) {
    const formatTable = hasKeyDicList[i].formatTable
    const key = hasKeyDicList[i].key
    // 格式化字段
    const keyFormat = key + "Format"
    // 格式化element的type字段
    const keyFormatElType = key + "FormatElType"
    for (let n = 0; n < list.length; n++) {
      formatTable.forEach((cur) => {
        // 匹配对象有可能是数组 有可能是 number
        let dicKeyArr = []
        if (Array.isArray(cur.value)) {
          dicKeyArr = cur.value
        } else {
          dicKeyArr.push(cur.value)
        }

        if (dicKeyArr.includes(list[n][key])) {
          list[n][keyFormat] = cur.text
          // 如果有elType 则处理
          if (cur.elType) {
            list[n][keyFormatElType] = cur.elType
          }
        }
      })
      if (!list[n][keyFormat]) {
        list[n][keyFormat] = "未知"
      }
    }
  }

  // 时间格式化
  for (let i = 0; i < list.length; i++) {
    if (list[i].createdAt) {
      list[i].createdAtFormat = dayjs(list[i].createdAt).format(
        "YYYY-MM-DD HH:mm:ss"
      )
    }

    if (list[i].updatedAt) {
      list[i].updatedAtFormat = dayjs(list[i].updatedAt).format(
        "YYYY-MM-DD HH:mm:ss"
      )
    }
  }
}
