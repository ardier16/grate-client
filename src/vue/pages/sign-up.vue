<template>
  <div class="auth-page">
    <h2 class="auth-page__title">
      {{ 'auth-pages.sign-up' | globalize }}
    </h2>

    <div class="auth-page__content">
      <sign-up-form />

      <div class="auth-page__tips">
        <div class="auth-page__tip">
          {{ 'auth-pages.have-account-question' | globalize }}
          <router-link
            class="auth-page__tip-link"
            :to="vueRoutes.signIn"
          >
            {{ 'auth-pages.have-account-answer' | globalize }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignUpForm from '@/vue/forms/sign-up-form.vue'
import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'sign-up',
  components: { SignUpForm },

  data: _ => ({
    vueRoutes,
  }),
}
</script>

<style lang="scss">
@import "./auth-page";
</style>
