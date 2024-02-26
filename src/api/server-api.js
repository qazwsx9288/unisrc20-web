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

// 验证用户的订单列表是否存在这个token
export const getOrderStatus = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getOrderStatus?${d}`,
    method: "get",
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

// ticker的transactions列表
export const getContractTransactions = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getContractTransactions?${d}`,
    method: "get",
  })
}

// 获取邀请排序
export const getInviteOrder = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getInviteOrder?${d}`,
    method: "get",
  })
}

// 获得最近的邀请
export const getInviteLatest = (data) => {
  const d = buildQueryParm(data)
  return service({
    url: `/v1/getInviteLatest?${d}`,
    method: "get",
  })
}

// 验证地址分数能否mint
export const scoreVerify = (data) => {
  return service({
    url: `/v1/scoreVerify`,
    method: "post",
    data,
  })
}

// 报告社媒账户
export const collectData = (data) => {
  return service({
    url: `/v1/collectData`,
    method: "post",
    data,
  })
}
