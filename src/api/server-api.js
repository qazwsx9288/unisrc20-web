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
    url: `/v1/gasCountLatest?${d}`,
    method: "get",
  })
}

// 验证(brc20)是否存在这个token
export const verifyToken = (data) => {
  return service({
    url: `/v1/verifyToken`,
    method: "post",
    data,
  })
}

// 获取l2 ticker详情
export const orderMsg = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/orderMsg?${d}`,
    method: "get",
  })
}

// 创建一个订单
export const createOrder = (data) => {
  return service({
    url: `/v1/createOrder`,
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
export const verifyWhitelist = (data) => {
  return service({
    url: `/v1/verifyWhitelist`,
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

// 验证token和address
export const verifyAddress = (data) => {
  return service({
    url: `/v1/verifyAddress`,
    method: "post",
    data,
  })
}

// 获取任务列表
export const getTaskList = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getTaskList?${d}`,
    method: "get",
  })
}

// 完成任务
export const completeTask = (data) => {
  return service({
    url: `/v1/completeTask`,
    method: "post",
    data,
  })
}

// ticker的holders列表
export const getHolders = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getHolders?${d}`,
    method: "get",
  })
}
