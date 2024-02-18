import axios from "axios" // 引入axios
import { ElMessage } from "element-plus"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"
// 错误报告
import { postErrorLogs } from "@/utils/error-poster.js"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 20 * 1000,
})

// http request 拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    config.headers = {
      ...config.headers,
      token: token,
    }
    return config
  },
  (error) => {
    console.log("request请求错误：", error)
    return error
  }
)

// http response 拦截器
service.interceptors.response.use(
  (response) => {
    const web3Wallet = useWeb3Wallet()
    // 请求有响应
    if (response.data.code === 0) {
      return response.data
    } else if (response.data.code === 55) {
      // token失效
      web3Wallet.clearSigner()
      ElMessage({
        message: "Please connect again",
        type: "error",
      })
    } else {
      console.log("服务端返回错误：", response)
      const msg = response?.data?.msg || "Server Error!"
      ElMessage({
        message: msg,
        type: "error",
      })
      postErrorLogs({
        errorType: 1, // 错误类型: 1接口报错 2代码报错
        errorInfo: JSON.stringify(response),
        note: "服务端返回错误",
      })

      return Promise.reject(response)
    }
  },
  (error) => {
    console.log("response请求错误：", error)
    ElMessage({
      message: "Network error, server not responding.",
      type: "error",
    })
    postErrorLogs({
      errorType: 1, // 错误类型: 1接口报错 2代码报错
      errorInfo: JSON.stringify(error),
      note: "response请求错误",
    })
    return Promise.reject(error)
  }
)

export default service
