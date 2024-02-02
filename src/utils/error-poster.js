import axios from "axios"
import dayjs from "dayjs"
// 用户获取当前项目的用户信息
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
// 加密
import CryptoJS from "crypto-js"

// TODO:上线
const service = axios.create({
  baseURL: import.meta.env.VITE_ERROR_API,
  timeout: 99999,
})

// 操作系统
const osType = (function () {
  const ua = window.navigator.userAgent
  if (/(Android)/.test(ua)) {
    return "android"
  }
  if (/(iPhone|iPad)/.test(ua)) {
    return "ios"
  }
  return "web"
})()
// user agent
const ua = (function () {
  return window.navigator.userAgent
})()

// 提交错误
export function postErrorLogs(params) {
  /**
   * @description params可携带参数
   * @param errorType Number 错误类型: 1接口报错 2代码报错
   * @param errorInfo String （必填）错误信息
   * @param errorComponent String 错误组件
   * */

  if (!params.errorInfo) {
    return Promise.resolve()
  }

  // 检查重复提交
  const errorHash = _generateErrorHash(params.errorInfo)
  const canPost = _canSubmitError(errorHash)

  if (!canPost) {
    return Promise.resolve()
  }

  // 处理唯一id
  let uniqueId
  if (localStorage) {
    // localStorage 可用
    uniqueId =
      localStorage.getItem("uniqueId") ||
      "id-" + Math.random().toString(36).slice(2, 10) + "-" + Date.now()
    localStorage.setItem("uniqueId", uniqueId)
  } else {
    // localStorage 不可用（浏览器不允许使用 如隐私模式）
    uniqueId = "unknown"
  }

  // 获取当前项目的用户名
  const web3Wallet = useWeb3Wallet()
  const userName = web3Wallet?.userWallet?.address

  // 构建时间
  const time = dayjs().format("YYYY/MM/DD HH:mm:ss")

  const encryptString = CryptoJS.AES.encrypt(
    String(time),
    import.meta.env.VITE_ERROR_API_KEY
  ).toString()

  return service({
    url: "/log/error",
    method: "POST",
    data: {
      ...params,
      // 当前用户url
      pageUrl: window.location.href,
      // 项目名称
      projectName: import.meta.env.VITE_PROJECT_NAME || "unknown",
      // 操作系统
      os: osType,
      // User agent
      ua: ua,
      // 用户唯一标识
      uniqueId: uniqueId,
      // 用户名
      userName: userName,
      // 时间
      time: time,
      encryptString,
    },
  })
}

/**
 * 内部方法
 */

// 生成错误的哈希值
function _generateErrorHash(errorInfo) {
  return CryptoJS.SHA256(errorInfo).toString(CryptoJS.enc.Hex)
}

// 检查错误是否可以提交
function _canSubmitError(errorHash) {
  let errorLog = JSON.parse(localStorage.getItem("errorLog") || "{}")
  // 清除过期的错误日志
  _cleanExpiredErrorLogs(errorLog)

  const currentTime = Date.now()
  if (errorLog[errorHash] && currentTime - errorLog[errorHash] < 30000) {
    // 如果同一错误在30秒内已提交，返回false
    return false
  }
  // 更新错误记录 key=hash value=currentTime
  errorLog[errorHash] = currentTime
  localStorage.setItem("errorLog", JSON.stringify(errorLog))
  return true
}

// 清除过期的错误日志
function _cleanExpiredErrorLogs(errorLog) {
  const currentTime = Date.now()
  Object.keys(errorLog).forEach((key) => {
    // 假设错误日志的有效期限定为30秒
    if (currentTime - errorLog[key] > 30000) {
      delete errorLog[key]
    }
  })
}
