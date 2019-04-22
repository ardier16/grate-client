import Vue from 'vue'
import Router from 'vue-router'

import { store, vuexTypes } from '@/vuex'

import { vueRoutes } from '@/vue-router/routes'

import AppContent from '@/vue/app-content'
import Auth from '@/vue/pages/auth'
import SignIn from '@/vue/pages/sign-in'
import SignUp from '@/vue/pages/sign-up'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: { name: 'app' },
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      redirect: { name: 'sign-in' },
      beforeEnter: authPageGuard,
      children: [
        {
          path: '/sign-in',
          name: 'sign-in',
          component: SignIn,
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: SignUp,
        },
      ],
    },
    {
      path: '/',
      name: 'app',
      component: AppContent,
      beforeEnter: inAppRouteGuard,
    },
  ],
})

// doesn't allow to visit auth page if user is already signed in
function authPageGuard (to, from, next) {
  const isSignedIn = store.getters[vuexTypes.isSignedIn]

  isSignedIn
    ? next(vueRoutes.app)
    : next()
}

// doesn't allow to visit in-app page if user is not already signed in
function inAppRouteGuard (to, from, next) {
  const isSignedIn = store.getters[vuexTypes.isSignedIn]

  isSignedIn
    ? next()
    : next({
      name: vueRoutes.signIn.name,
      query: { redirectPath: to.fullPath },
    })
}

export { router }
