import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  profiles: [],
}

export const mutations = {
  [vuexTypes.SET_PROFILES] (state, profiles) {
    state.profiles = profiles
  },
}

export const actions = {
  async [vuexTypes.LOAD_PROFILES] ({ commit }) {
    const data = await api().get({
      endpoint: `/users`,
    })

    commit(vuexTypes.SET_PROFILES, data)
  },
}

export const getters = {
  [vuexTypes.profiles]: state => state.profiles,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
