/**
 * @author: chen
 * @description:
 * @Date: 2017/10/31
 */
import axios from 'axios'

export function ipCheck (q) {
  const url = `http://dongtu.com:9999/ipcheck?q=${q}`
  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
