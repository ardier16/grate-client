import Vue from 'vue'
import Router from 'vue-router'

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
      redirect: { name: 'signin' },
      children: [
        {
          path: '/sign-in',
          name: 'signin',
          component: SignIn,
        },
        {
          path: '/sign-up',
          name: 'signup',
          component: SignUp,
        },
      ],
    },
    {
      path: '/',
      name: 'app',
      component: AppContent,
    },
  ],
})

export { router }
