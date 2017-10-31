/**
 * @author: chen
 * @description:
 * @Date: 2017/10/30
 */
import axios from 'axios'

export function ipDetail (q) {
  const url = `http://dongtu.com:9999/ipdetail/${q}`
  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
