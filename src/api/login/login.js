import axios from '../config'
import qs from 'qs'

export function login ({accesstoken}) {
  return axios.post('accesstoken', qs.stringify({accesstoken}))
}

// 获取用户详情
export function getUserInfo (loginname) {
  return axios.get(`user/${loginname}`)
}
