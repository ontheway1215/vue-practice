/**
 * @author: chen
 * @description:
 * @Date: 2017/10/26
 */

import axios from 'axios'
import { currentIp, protocol } from './config'

export function gifDetail (guid) {
  const url = `${protocol}://${currentIp}:9999/gif/detail/${guid}`

  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function getRelation (item) {
  const url = `${protocol}://${currentIp}:9999/mutli/search?q=${item}`

  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function getLoadMore (item, p) {
  const url = `${protocol}://${currentIp}:9999/mutli/search?q=${item}&page=${p}`

  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
