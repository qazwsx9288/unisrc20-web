import service from "@/utils/request.js"

export const captcha = (data) => {
  return service({
    url: "/base/captcha",
    method: "post",
    data: data,
  })
}
