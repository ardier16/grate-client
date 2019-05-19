import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import profile from './profile.module'
import posts from './posts.module'
import profiles from './profiles.module'

import { vuexTypes } from '@/vuex/types'
import { localStoragePlugin } from './plugins/local-storage'

Vue.use(Vuex)

export const rootModule = {
  actions: {},
  mutations: {
    // These mutations are being subscribed by plugins
    [vuexTypes.POP_STATE] () {},
    [vuexTypes.CLEAR_STATE] () {},
  },
  getters: {},
  state: {},
}

const store = new Vuex.Store({
  ...rootModule,
  modules: {
    auth,
    profile,
    profiles,
    posts,
  },
  plugins: [localStoragePlugin],
})

store.commit(vuexTypes.POP_STATE)

export { store }
export { vuexTypes } from './types'
