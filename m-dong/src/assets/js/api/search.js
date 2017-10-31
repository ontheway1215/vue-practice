import axios from 'axios'
import { currentIp, protocol } from './config'

export function searchResult (q, p, size) {
  const url = `${protocol}://${currentIp}:9999/search/${decodeURI(q)}?page=${p}&size=${size}`
  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
