import * as types from './mutation-types'

const mutations = {
  [types.TOKEN] (state, token) {
    state.token = token
  },
  [types.USER] (state, user) {
    state.user = user
  }
}

export default mutations
