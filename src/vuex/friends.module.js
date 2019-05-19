import { vuexTypes } from './types'
import { api } from '@/api'

export const state = {
  friends: [],
  friendsSentRequests: [],
  friendsReceivedRequests: [],
}

export const mutations = {
  [vuexTypes.SET_FRIENDS] (state, friends) {
    state.friends = friends
  },

  [vuexTypes.SET_FRIENDS_SENT_REQUESTS] (state, requests) {
    state.friendsSentRequests = requests
  },

  [vuexTypes.SET_FRIENDS_RECEIVED_REQUESTS] (state, requests) {
    state.friendsReceivedRequests = requests
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

  async [vuexTypes.LOAD_FRIENDS_SENT_REQUESTS] ({ commit, rootGetters }) {
    const data = await api().get({
      endpoint: `/friends/sent`,
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_FRIENDS_SENT_REQUESTS, data)
  },

  async [vuexTypes.LOAD_FRIENDS_RECEIVED_REQUESTS] ({ commit, rootGetters }) {
    const data = await api().get({
      endpoint: `/friends/received`,
      token: rootGetters[vuexTypes.authToken],
    })

    commit(vuexTypes.SET_FRIENDS_RECEIVED_REQUESTS, data)
  },

  async [vuexTypes.SEND_FRIEND_REQUEST] ({ rootGetters }, userId) {
    await api().post({
      endpoint: `/friends/request`,
      data: { participantId: userId },
      token: rootGetters[vuexTypes.authToken],
    })
  },

  async [vuexTypes.APPROVE_FRIEND_REQUEST] ({ rootGetters }, requestId) {
    await api().post({
      endpoint: `/friends/${requestId}/approve`,
      data: { participantId: requestId },
      token: rootGetters[vuexTypes.authToken],
    })
  },

  async [vuexTypes.REJECT_FRIEND_REQUEST] ({ rootGetters }, requestId) {
    await api().post({
      endpoint: `/friends/${requestId}/reject`,
      data: { participantId: requestId },
      token: rootGetters[vuexTypes.authToken],
    })
  },
}

export const getters = {
  [vuexTypes.friends]: state => state.friends,
  [vuexTypes.friendsSentRequests]: state => state.friendsSentRequests,
  [vuexTypes.friendsReceivedRequests]: state => state.friendsReceivedRequests,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
