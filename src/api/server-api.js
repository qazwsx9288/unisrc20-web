import service from "@/utils/request.js"

// ticker列表
export const tickerList = (data) => {
  return service({
    url: `/v1/tickerList?page=${data.page}&pageSize=${data.pageSize}&type=${data.type}`,
    method: "get",
  })
}

// 最新的铸造费用
export const gasCountLatest = (data) => {
  return service({
    url: `/gasCountLatest?addr=${data.addr}`,
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
