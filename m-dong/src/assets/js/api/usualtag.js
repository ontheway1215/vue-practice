/**
 * @author: chen
 * @description:
 * @Date: 2017/10/30
 */

import axios from 'axios'

export function usualTag () {
  const url = `http://dongtu.com:9999/usualtag`
  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
