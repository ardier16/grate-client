import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  friends: [],
}

export const mutations = {
  [vuexTypes.SET_FRIENDS] (state, friends) {
    state.friends = friends
  },
}

export const actions = {
  async [vuexTypes.LOAD_FRIENDS] ({ commit, rootGetters }) {
    const data = await api().get({
      endpoint: `/friends`,
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_FRIENDS, data)
  },
}

export const getters = {
  [vuexTypes.friends]: state => state.friends,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
