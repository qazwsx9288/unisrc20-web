// 将json转换为querystring；不包含起始的"?"
export function buildQueryParm(data) {
  let str = ""
  for (let k in data) {
    if (str !== "") str += `&`
    str = `${str}${k}=${data[k]}`
  }
  return encodeURI(str)
}

// 复制内容到剪贴板
export function copyToClipboard(text) {
  // 新的API方法
  if (navigator.clipboard && window.isSecureContext) {
    // navigator.clipboard.writeText只在安全的浏览上下文中可用（HTTPS，localhost等）
    return navigator.clipboard.writeText(text).catch((err) => {
      throw new Error("Failed to copy: ", err)
    })
  } else {
    // 不支持Clipboard API，使用较旧的execCommand方法
    try {
      // 创建一个textarea元素
      let textarea = document.createElement("textarea")
      textarea.value = text
      // 使textarea不在视图中
      textarea.style.position = "fixed"
      textarea.style.left = "-9999px"
      textarea.style.top = "-9999px"
      document.body.appendChild(textarea)
      // 选中文本
      textarea.focus()
      textarea.select()
      // 执行复制操作
      let successful = document.execCommand("copy")
      // 移除textarea元素
      document.body.removeChild(textarea)

      if (!successful) {
        throw new Error("Failed to copy text.")
      }
    } catch (err) {
      throw new Error("Failed to copy text: ", err)
    }
  }
}

// 获取当前页的queryString
export function getQueryString() {
  // 创建一个空对象来保存查询参数
  let queryParams = {}

  // 获取当前URL的查询字符串部分，去除'?'
  let queryString = window.location.search.substring(1)

  // 检查查询字符串是否为空
  if (queryString) {
    // 将查询字符串分解为单独的参数
    let params = queryString.split("&")

    // 遍历参数
    for (let param of params) {
      // 将每个参数分解为键和值
      let pair = param.split("=")

      // 解码键和值，并将它们添加到queryParams对象
      let key = decodeURIComponent(pair[0])
      let value = pair.length > 1 ? decodeURIComponent(pair[1]) : null

      // 如果键已经存在，则创建数组来支持多个值
      if (queryParams[key]) {
        if (!Array.isArray(queryParams[key])) {
          queryParams[key] = [queryParams[key]]
        }
        queryParams[key].push(value)
      } else {
        queryParams[key] = value
      }
    }
  }

  // 返回包含所有查询参数的对象
  return queryParams
}

// return promise(file)
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()

    // 读取文件完成时触发的回调函数
    reader.onload = function (event) {
      // 将文件内容转换为Base64字符串
      var base64String = event.target.result
      resolve(base64String)
    }

    // 读取文件出错时触发的回调函数
    reader.onerror = function (error) {
      reject(error)
    }

    // 读取文件内容，并以DataURL的形式返回
    reader.readAsDataURL(file)
  })
}
