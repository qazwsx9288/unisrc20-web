export function buildQueryParm(data) {
  let str = ""
  for (let k in data) {
    if (str !== "") str += `&`
    str = `${str}${k}=${data[k]}`
  }
  return str
}
