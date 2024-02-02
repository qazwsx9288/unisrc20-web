import { nextTick } from "vue"
import { postErrorLogs } from "@/utils/error-poster.js"

export async function errorHandler(err, vm, info) {
  nextTick(async () => {
    try {
      await postErrorLogs({
        errorType: 2, // 错误类型: 1接口报错 2代码报错
        errorComponent: vm.$.vnode.type.__file,
        errorInfo: err.toString(),
        note: `[Component]: ${vm.$.vnode.type.__file} \n[Error]: ${err} \n[Life Cycle]: ${info}`,
      })
    } catch (error) {
      console.log(error)
    }
  })
}

export async function onerror(message, url, lineno, colno, error) {
  try {
    await postErrorLogs({
      errorType: 2, // 错误类型: 1接口报错 2代码报错
      errorInfo: `[Message]: ${message}\n[URL]: ${url}\n[Error Line]: ${lineno}\n[Error col]: ${colno}\n[Error Object]: ${JSON.stringify(
        error
      )}`,
    })
  } catch (error) {
    console.log(error)
  }
}
