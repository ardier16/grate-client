import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  posts: [],
}

export const mutations = {
  [vuexTypes.SET_POSTS] (state, posts) {
    state.posts = posts
  },
}

export const actions = {
  async [vuexTypes.LOAD_POSTS] ({ commit }) {
    const data = await api().get({
      endpoint: `/posts`,
    })

    commit(vuexTypes.SET_POSTS, data)
  },

  async [vuexTypes.CREATE_POST] ({ rootGetters }, opts) {
    await api().post({
      endpoint: '/posts',
      data: opts,
      token: rootGetters[vuexTypes.authToken],
    })
  },

  async [vuexTypes.UPDATE_POST] ({ rootGetters }, opts) {
    await api().put({
      endpoint: `/posts/${opts.id}`,
      data: opts,
      token: rootGetters[vuexTypes.authToken],
    })
  },

  async [vuexTypes.DELETE_POST] ({ rootGetters }, id) {
    await api().delete({
      endpoint: `/posts/${id}`,
      token: rootGetters[vuexTypes.authToken],
    })
  },
}

export const getters = {
  [vuexTypes.posts]: state => state.posts,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
