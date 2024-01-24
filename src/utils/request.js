import axios from "axios" // 引入axios
import { ElMessage } from "element-plus"
import { useWeb3Wallet } from "@/pinia/modules/useWeb3Wallet.js"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 99999,
})

// http request 拦截器
service.interceptors.request.use(
  (config) => {
    const web3Wallet = useWeb3Wallet()
    config.headers = {
      ...config.headers,
      token: web3Wallet?.userWallet?.token,
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
    }
  },
  (error) => {
    console.log("response请求错误：", error)
    return error
  }
)

export default service
