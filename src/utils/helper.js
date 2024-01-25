// 将json转换为querystring；不包含起始的"?"
export function buildQueryParm(data) {
  let str = ""
  for (let k in data) {
    if (str !== "") str += `&`
    str = `${str}${k}=${data[k]}`
  }
  return str
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
