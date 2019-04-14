import './scss/app.scss'

import Vue from 'vue'
import App from '@/vue/app'
import i18next from 'i18next'
import Vuelidate from 'vuelidate'
import VueResource from 'vue-resource'

import { store } from '@/vuex'
import { router } from '@/vue-router'
import { i18nOptions } from '@/i18n'
import { globalize } from '@/vue/filters/globalize'
import { formatDate } from '@/vue/filters/format-date'

i18next.init(i18nOptions)

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.filter('globalize', globalize)
Vue.filter('formatDate', formatDate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
