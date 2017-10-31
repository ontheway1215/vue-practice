/**
 * @author: chen
 * @description:
 * @Date: 2017/10/27
 */
import axios from 'axios'

export function hotTag () {
  const url = `http://dongtu.com:9999/netword/hot`
  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
