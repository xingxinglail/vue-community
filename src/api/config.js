import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.vue-js.com/api/v1/'
})

service.interceptors.request.use(config => {
  return config
}, err => {
  Promise.reject(err)
})

export default service
