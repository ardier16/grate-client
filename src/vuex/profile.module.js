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
    let optsData = opts

    if (opts.avatar) {
      const docUrl = await api().uploadDocument(opts.avatar)
      optsData = Object.assign(opts, { avatarUrl: docUrl })
    }

    const data = await api().post({
      endpoint: '/profiles',
      data: optsData,
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_PROFILE, data)
  },

  async [vuexTypes.UPDATE_PROFILE] ({ commit, getters, rootGetters }, opts) {
    let optsData = opts

    if (opts.avatar) {
      const docUrl = await api().uploadDocument(opts.avatar)
      optsData = Object.assign(opts, { avatarUrl: docUrl })
    }

    const data = await api().put({
      endpoint: `/profiles/${getters[vuexTypes.profile].id}`,
      data: optsData,
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
