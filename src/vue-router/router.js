import Vue from 'vue'
import Router from 'vue-router'

import { store, vuexTypes } from '@/vuex'

import { vueRoutes } from '@/vue-router/routes'

import AppContent from '@/vue/app-content.vue'
import Auth from '@/vue/pages/auth.vue'
import SignIn from '@/vue/pages/sign-in.vue'
import SignUp from '@/vue/pages/sign-up.vue'
import Profile from '@/vue/pages/profile.vue'
import CreatePost from '@/vue/pages/create-post.vue'
import Feed from '@/vue/pages/feed.vue'
import Posts from '@/vue/pages/posts.vue'
import Post from '@/vue/pages/post.vue'
import Profiles from '@/vue/pages/profiles.vue'
import Friends from '@/vue/pages/friends.vue'

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
          path: '/create-post',
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
        {
          path: '/posts',
          name: vueRoutes.posts.name,
          component: Posts,
          meta: { pageTranslationId: 'pages.posts' },
        },
        {
          path: '/posts/:id',
          name: vueRoutes.post.name,
          component: Post,
          meta: { pageTranslationId: 'pages.post' },
        },
        {
          path: '/profiles',
          name: vueRoutes.profiles.name,
          component: Profiles,
          meta: { pageTranslationId: 'pages.profiles' },
        },
        {
          path: '/friends',
          name: vueRoutes.friends.name,
          component: Friends,
          meta: { pageTranslationId: 'pages.friends' },
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
