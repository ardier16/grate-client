<template>
  <div class="auth-page">
    <h2 class="auth-page__title">
      {{ 'auth-pages.sign-in' | globalize }}
    </h2>

    <div class="auth-page__content">
      <sign-in-form />

      <div class="auth-page__tips">
        <div class="auth-page__tip">
          {{ 'auth-pages.no-account-question' | globalize }}
          <router-link class="auth-page__tip-link" :to="vueRoutes.signUp">
            {{ 'auth-pages.no-account-answer' | globalize }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignInForm from '@/vue/forms/sign-in-form.vue'
import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'sign-in',
  components: { SignInForm },

  data: _ => ({
    vueRoutes,
  }),
}
</script>

<style lang="scss" scoped>
@import './auth-page';
</style>
