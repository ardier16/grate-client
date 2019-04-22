<template>
  <router-link class="logotype" :to="vueRoutes.app">
    <img :src="logoUrl" alt="gRate">
  </router-link>
</template>

<script>
import { vueRoutes } from '@/vue-router/routes'

const LOGO_URL = '/static/logo.svg'
const INVERSE_LOGO_URL = '/static/logo-inverse.svg'

export default {
  props: {
    inverse: { type: Boolean, default: false },
  },

  data: _ => ({
    vueRoutes,
  }),

  computed: {
    logoUrl () {
      return this.inverse ? INVERSE_LOGO_URL : LOGO_URL
    },
  },
}
</script>

<style lang="scss">
.logotype img {
  max-height: 8.5rem;
}
</style>
