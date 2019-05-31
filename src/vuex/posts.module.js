import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  posts: [],
  feedPosts: [],
}

export const mutations = {
  [vuexTypes.SET_POSTS] (state, posts) {
    state.posts = posts
  },

  [vuexTypes.SET_FEED_POSTS] (state, posts) {
    state.feedPosts = posts
  },
}

export const actions = {
  async [vuexTypes.LOAD_FEED] ({ commit, rootGetters }) {
    const data = await api().get({
      endpoint: '/posts/feed',
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_FEED_POSTS, data)
  },

  async [vuexTypes.LOAD_POSTS] ({ commit }) {
    const data = await api().get({
      endpoint: '/posts/',
    })

    commit(vuexTypes.SET_POSTS, data)
  },

  async [vuexTypes.LOAD_POST] (_, id) {
    const post = await api().get({
      endpoint: `/posts/${id}`,
    })

    return post
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

  async [vuexTypes.CREATE_COMMENT] ({ rootGetters }, opts) {
    await api().post({
      endpoint: `/posts/${opts.postId}/comment`,
      data: opts,
      token: rootGetters[vuexTypes.authToken],
    })
  },

  async [vuexTypes.UPDATE_COMMENT] ({ rootGetters }, opts) {
    await api().put({
      endpoint: `/posts/comments/${opts.id}`,
      data: opts,
      token: rootGetters[vuexTypes.authToken],
    })
  },

  async [vuexTypes.DELETE_COMMENT] ({ rootGetters }, id) {
    await api().delete({
      endpoint: `/posts/comments/${id}`,
      token: rootGetters[vuexTypes.authToken],
    })
  },
}

export const getters = {
  [vuexTypes.posts]: state => state.posts,
  [vuexTypes.feedPosts]: state => state.feedPosts,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
