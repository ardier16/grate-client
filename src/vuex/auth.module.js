import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  authToken: '',
}

export const mutations = {
  [vuexTypes.SET_AUTH_TOKEN] (state, token) {
    state.authToken = token
  },

  [vuexTypes.SIGN_OUT] (state) {
    state.authToken = ''
  },
}

export const actions = {
  async [vuexTypes.SIGN_IN] ({ commit }, { login, password }) {
    const { data } = await api().post({
      endpoint: '/',
      data: { login, password },
    })

    commit(vuexTypes.SET_AUTH_TOKEN, data.token)
  },
}

export const getters = {
  [vuexTypes.authToken]: state => state.authToken,
  [vuexTypes.isSignedIn]: state => state.authToken !== '',
}

export default {
  state,
  mutations,
  actions,
  getters,
}
