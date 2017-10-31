/**
 * @author: chen
 * @description:
 * @Date: 2017/10/26
 */

import axios from 'axios'

export function Category () {
  const url = `http://dongtu.com:9999/category`
  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
