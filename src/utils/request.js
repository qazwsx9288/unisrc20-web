import axios from "axios" // 引入axios

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 99999,
})

// http request 拦截器
service.interceptors.request.use(
  (config) => {
    // config.headers = {
    //   "Content-Type": "application/json",
    //   ...config.headers,
    // }
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
    // 请求有响应
    if (response.data.code === 0) {
      return response.data
    } else {
      console.log("服务端返回错误：", response)
    }
  },
  (error) => {
    console.log("response请求错误：", error)
    return error
  }
)

export default service
