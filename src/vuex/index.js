import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import profile from './profile.module'
import posts from './posts.module'
import profiles from './profiles.module'
import friends from './friends.module'

import { vuexTypes } from '@/vuex/types'
import { localStoragePlugin } from './plugins/local-storage'

import { CLIENT_LANGUAGES } from '@/js/const/client-languages'

Vue.use(Vuex)

export const rootModule = {
  actions: {},
  mutations: {
    [vuexTypes.SET_LANGUAGE] (state, language) {
      state.language = language
    },

    // These mutations are being subscribed by plugins
    [vuexTypes.POP_STATE] () {},
    [vuexTypes.CLEAR_STATE] () {},
  },
  getters: {
    [vuexTypes.language]: state => state.language || CLIENT_LANGUAGES.english,
  },
  state: {
    language: '',
  },
}

const store = new Vuex.Store({
  ...rootModule,
  modules: {
    auth,
    profile,
    posts,
    profiles,
    friends,
  },
  plugins: [localStoragePlugin],
})

store.commit(vuexTypes.POP_STATE)

export { store }
export { vuexTypes } from './types'
