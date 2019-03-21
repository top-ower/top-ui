/**
 * 获取 json文件数据
 * @param  {String} url 目标文件地址
 * @return {Promise} 
 */
export function getRequest(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response))
      }
    }
    xhr.send()
  })
}