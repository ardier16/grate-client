<template>
  <nav class="navbar">
    <div class="navbar__title-wrapper">
      <h2 class="navbar__title">
        {{ pageTranslationId | globalize }}
      </h2>
    </div>

    <div class="navbar__passport-wrp">
      <passport />
    </div>
  </nav>
</template>

<script>
import Passport from './passport'

export default {
  name: 'navbar',
  components: { Passport },

  computed: {
    pageTranslationId () {
      const pageNamePath = this.$route.matched
        .find(path => path.meta.pageTranslationId)

      return pageNamePath
        ? pageNamePath.meta.pageTranslationId
        : ''
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

  @include respond-to-custom($links-bar-hide-bp) {
    padding: 1.7rem $content-side-paddings-sm;
  }

  .navbar__title {
    font-size: 4rem;
    font-weight: normal;
    min-width: 15rem;

    @include respond-to-custom($links-bar-hide-bp) {
      font-size: 3rem;
    }
  }
}

.navbar__title {
  color: $col-text;
  font-size: 4rem;
  line-height: 1.5;
  font-weight: 400;

  @include respond-to-custom($links-bar-hide-bp) {
    font-size: 3.2rem;
  }
}
</style>
