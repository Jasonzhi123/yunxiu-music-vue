import axios from './index'

export const apiGetway = {
  api: 'api' // 业务接口
}

/**
 * 返回一个Promise(发送post请求)
 * params: 参数
 * 第三个参数: 表示以get方式请求；不传表示默认为post方式请求
 */
export function fetch(getway, action, get, params, bmtype) {
  if (getway) {
    action = `/${apiGetway[getway]}${action}`
  }

  return new Promise((resolve, reject) => {
    if (get === 'get') {
      // if (params && Object.keys(params).length !== 0) {
      //   if (action.indexOf('?') !== -1) {
      //     console.log(Object.keys(params))
      //     Object.keys(params).forEach(item => {
      //       action += `&item=${params[item]}`
      //     })
      //   } else {
      //     console.log(Object.keys(params))
      //     action += `?`
      //     Object.keys(params).forEach(item => {
      //       action += JSON.stringify(`&${item}=${params[item]}`)
      //     })
      //   }
      // }
      // if (action.indexOf('?') !== -1) {
      //   action += `&${Date.parse(new Date()) / 1000}`
      // } else {
      //   action += `?${Date.parse(new Date()) / 1000}`
      // }

      axios.get(action, {
        params
      }).then(response => {
        console.log('--get请求成功啦--')
        resolve(response.data)
      }, err => {
        reject(err)
      })
        .catch(error => {
          reject(error)
        })
    } else {
      const headers = {}
      if (bmtype === 'formdata') {
        headers['content-type'] = 'multipart/form-data'
      } else {
        headers['content-type'] = 'application/json;charset=UTF-8'
      }
      axios.post(action, params, {
        headers
      }).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
        .catch(error => {
          reject(error)
        })
    }
  })
}
