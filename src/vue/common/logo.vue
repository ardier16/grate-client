<template>
  <router-link class="logotype" :to="vueRoutes.app">
    <img :src="logoUrl" alt="gRate">
  </router-link>
</template>

<script>
import { vueRoutes } from '@/vue-router/routes'

const DEFAULT_LOGO_URL = '/static/logo.svg'

export default {
  data: _ => ({
    vueRoutes,
  }),

  computed: {
    logoUrl () {
      return DEFAULT_LOGO_URL
    },
  },
}
</script>

<style lang="scss">
.logotype img {
  max-height: 8.5rem;
}
</style>
