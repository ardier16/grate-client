<template>
  <div class="search">
    <top-bar>
      <template slot="main">
        <router-link :to="vueRoutes.searchPosts">
          <span>{{ 'search.search-posts-title' | globalize }}</span>
        </router-link>
        <router-link :to="vueRoutes.searchProfiles">
          <span>{{ 'search.search-profiles-title' | globalize }}</span>
        </router-link>
      </template>
    </top-bar>

    <router-view />
  </div>
</template>

<script>
import TopBar from '@/vue/common/top-bar.vue'

import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'search',
  components: {
    TopBar,
  },

  data: _ => ({
    vueRoutes,
  }),
}
</script>

<style lang="scss" scoped>

</style>
