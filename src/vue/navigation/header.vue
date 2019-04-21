<template>
  <nav class="header">
    <div class="header__title-wrapper">
      <h2 class="header__title">
        {{ 'pageNameTranslationId' | globalize }}
      </h2>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'header',

  computed: {
    pageNameTranslationId () {
      const pageNamePath = this.$route.matched
        .find(path => path.meta.pageNameTranslationId)
      if (pageNamePath) {
        return pageNamePath.meta.pageNameTranslationId
      } else {
        return ''
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "~@scss/mixins";
@import "~@scss/variables";

.header {
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

  .header__title {
    font-size: 4rem;
    font-weight: normal;
    min-width: 15rem;

    @include respond-to-custom($sidebar-hide-bp) {
      font-size: 3rem;
    }
  }
}

.header__title {
  color: $col-text;
  font-size: 4rem;
  line-height: 1.5;
  font-weight: 400;

  @include respond-to-custom($sidebar-hide-bp) {
    font-size: 3.2rem;
  }
}
</style>
