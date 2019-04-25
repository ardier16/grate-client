import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  posts: null,
}

export const mutations = {
  [vuexTypes.SET_POSTS] (state, posts) {
    state.posts = posts
  },
}

export const actions = {
  async [vuexTypes.LOAD_POSTS] ({ commit, posts }) {
    const data = await api().get({
      endpoint: `/posts`,
    })

    commit(vuexTypes.SET_POSTS, data)
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
