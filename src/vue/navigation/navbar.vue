<template>
  <nav class="navbar">
    <div class="navbar__title-wrapper">
      <h2 class="navbar__title">
        {{ pageTranslationId | globalize }}
      </h2>
    </div>

    <div class="navbar__actions-wrp">
      <button
        class="app__button-primary"
        @click="processSignOut"
      >
        {{ 'navbar.sign-out-btn' | globalize }}
      </button>
    </div>
  </nav>
</template>

<script>
import { vuexTypes } from '@/vuex'
import { mapMutations } from 'vuex'

import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'navbar',

  computed: {
    pageTranslationId () {
      const pageNamePath = this.$route.matched
        .find(path => path.meta.pageTranslationId)

      return pageNamePath
        ? pageNamePath.meta.pageTranslationId
        : ''
    },
  },

  methods: {
    ...mapMutations({
      signOut: vuexTypes.SIGN_OUT,
      clearState: vuexTypes.CLEAR_STATE,
    }),

    processSignOut () {
      this.signOut()
      this.clearState()
      this.$router.push(vueRoutes.auth)
    },
  },
}
</script>

<style scoped lang="scss">
@import "~@scss/mixins";
@import "~@scss/variables";

.navbar {
  width: 100%;
  background-color: $col-app-background;
  padding: 3.3rem $content-padding-right 2.1rem $content-padding-left;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include respond-to-custom($sidebar-hide-bp) {
    padding: 3.3rem $content-side-paddings-sm
      2.1rem $content-side-paddings-sm + 5.2rem;
  }

  .navbar__title {
    font-size: 4rem;
    font-weight: normal;
    min-width: 15rem;

    @include respond-to-custom($sidebar-hide-bp) {
      font-size: 3rem;
    }
  }
}

.navbar__title {
  color: $col-text;
  font-size: 4rem;
  line-height: 1.5;
  font-weight: 400;

  @include respond-to-custom($sidebar-hide-bp) {
    font-size: 3.2rem;
  }
}
</style>
