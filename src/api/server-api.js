import service from "@/utils/request.js"
import { buildQueryParm } from "@/utils/helper.js"

// ticker列表
export const tickerList = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/tickerList?${d}`,
    method: "get",
  })
}

// 最新的铸造费用
export const gasCountLatest = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/gasCountLatest?${d}`,
    method: "get",
  })
}

// 验证是否存在这个token
export const verifyToken = (data) => {
  return service({
    url: `/verifyToken`,
    method: "post",
    data,
  })
}

// 创建一个订单
export const createOrder = (data) => {
  return service({
    url: `/createOrder`,
    method: "post",
    data,
  })
}

// 获取地址的所有订单
export const getAllOrder = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getAllOrder?${d}`,
    method: "get",
  })
}

// 验证白名单
export const verifyWritelist = (data) => {
  return service({
    url: `/v1/verifyWritelist`,
    method: "post",
    data,
  })
}

// 获取签名的消息
export const getSignatureMessage = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getSignatureMessage?${d}`,
    method: "get",
  })
}

// 验证签名
export const verifySignature = (data) => {
  return service({
    url: `/v1/verifySignature`,
    method: "post",
    data,
  })
}
