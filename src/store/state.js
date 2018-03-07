import {getSession} from 'js/util'
let token = getSession('token') || ''
if (token !== '') {
  token = token.token
}
let user = getSession('user')

const state = {
  token,
  user
}

export default state
