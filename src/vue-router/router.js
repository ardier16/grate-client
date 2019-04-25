import Vue from 'vue'
import Router from 'vue-router'

import { store, vuexTypes } from '@/vuex'

import { vueRoutes } from '@/vue-router/routes'

import AppContent from '@/vue/app-content'
import Auth from '@/vue/pages/auth'
import SignIn from '@/vue/pages/sign-in'
import SignUp from '@/vue/pages/sign-up'
import Profile from '@/vue/pages/profile'
import CreatePost from '@/vue/pages/create-post'
import Feed from '@/vue/pages/feed'

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
      redirect: vueRoutes.signIn,
      beforeEnter: authPageGuard,
      children: [
        {
          path: '/sign-in',
          name: vueRoutes.signIn.name,
          component: SignIn,
        },
        {
          path: '/sign-up',
          name: vueRoutes.signUp.name,
          component: SignUp,
        },
      ],
    },
    {
      path: '/',
      name: 'app',
      component: AppContent,
      beforeEnter: inAppRouteGuard,
      redirect: vueRoutes.profile,
      children: [
        {
          path: '/profile',
          name: vueRoutes.profile.name,
          component: Profile,
          meta: { pageTranslationId: 'pages.profile' },
        },
        {
          path: '/posts/create',
          name: vueRoutes.createPost.name,
          component: CreatePost,
          meta: { pageTranslationId: 'pages.create-post' },
        },
        {
          path: '/feed',
          name: vueRoutes.feed.name,
          component: Feed,
          meta: { pageTranslationId: 'pages.feed' },
        },
      ],
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
