import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  authToken: '',
  userId: '',
}

export const mutations = {
  [vuexTypes.SET_AUTH_TOKEN] (state, token) {
    state.authToken = token
  },

  [vuexTypes.SET_USER_ID] (state, id) {
    state.userId = id
  },

  [vuexTypes.SIGN_OUT] (state) {
    state.authToken = ''
  },
}

export const actions = {
  async [vuexTypes.SIGN_IN] ({ commit }, { login, passwordHash }) {
    const data = await api().post({
      endpoint: '/auth',
      data: { login, passwordHash },
    })

    commit(vuexTypes.SET_AUTH_TOKEN, data.token)
    commit(vuexTypes.SET_USER_ID, data.id)
  },
}

export const getters = {
  [vuexTypes.authToken]: state => state.authToken,
  [vuexTypes.userId]: state => state.userId,
  [vuexTypes.isSignedIn]: state => state.authToken !== '',
}

export default {
  state,
  mutations,
  actions,
  getters,
}
