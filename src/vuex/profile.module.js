import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  profile: null,
}

export const mutations = {
  [vuexTypes.SET_PROFILE] (state, profile) {
    state.profile = profile
  },
}

export const actions = {
  async [vuexTypes.LOAD_PROFILE] ({ commit, rootGetters }) {
    const data = await api().get({
      endpoint: `/profiles/mine`,
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_PROFILE, data)
  },

  async [vuexTypes.CREATE_PROFILE] ({ commit, rootGetters }, opts) {
    const data = await api().post({
      endpoint: '/profiles',
      data: opts,
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_PROFILE, data)
  },

  async [vuexTypes.UPDATE_PROFILE] ({ commit, getters, rootGetters }, opts) {
    const data = await api().put({
      endpoint: `/profiles/${getters[vuexTypes.profile]._id}`,
      data: opts,
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_PROFILE, data)
  },
}

export const getters = {
  [vuexTypes.profile]: state => state.profile,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
