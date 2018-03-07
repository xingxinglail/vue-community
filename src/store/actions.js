import * as types from './mutation-types'

export function setToken ({commit}, {token, user}) {
  commit(types.TOKEN, token)
  commit(types.USER, user)
}
