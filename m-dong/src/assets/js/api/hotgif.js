import axios from 'axios'

export function hotGif (p) {
  const url = `http://dongtu.com:9999/hot/gif?page=${p}`
  return axios.get(url)
    .then(function (res) {
      return Promise.resolve(res.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
