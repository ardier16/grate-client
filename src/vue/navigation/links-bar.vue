<template>
  <div class="links-bar">
    <aside class="links-bar__aside">
      <section class="links-bar__logo-section">
        <router-link
          :to="vueRoutes.app"
        >
          <logo class="links-bar__logo" />
        </router-link>
      </section>

      <section class="links-bar__links-section">
        <nav class="links-bar__links-group">
          <router-link
            class="links-bar__link"
            :to="vueRoutes.profile"
            tag="a"
          >
            <i class="links-bar__link-icon mdi mdi-account" />
            <span class="links-bar__link-text">
              {{ 'pages.profile' | globalize }}
            </span>
          </router-link>

          <router-link
            class="links-bar__link"
            :to="vueRoutes.feed"
            tag="a"
          >
            <i class="links-bar__link-icon mdi mdi-calendar-text-outline" />
            <span class="links-bar__link-text">
              {{ 'pages.feed' | globalize }}
            </span>
          </router-link>

          <router-link
            class="links-bar__link"
            :to="vueRoutes.createPost"
            tag="a"
          >
            <i class="links-bar__link-icon mdi mdi-plus" />
            <span class="links-bar__link-text">
              {{ 'pages.create-post' | globalize }}
            </span>
          </router-link>

          <router-link
            class="links-bar__link"
            :to="vueRoutes.friends"
            tag="a"
          >
            <i class="links-bar__link-icon mdi mdi-account-group" />
            <span class="links-bar__link-text">
              {{ 'pages.friends' | globalize }}
            </span>
          </router-link>

          <router-link
            class="links-bar__link"
            :to="vueRoutes.profiles"
            tag="a"
          >
            <i class="links-bar__link-icon mdi mdi-account-multiple" />
            <span class="links-bar__link-text">
              {{ 'pages.profiles' | globalize }}
            </span>
          </router-link>

          <router-link
            class="links-bar__link"
            :to="vueRoutes.posts"
            tag="a"
          >
            <i class="links-bar__link-icon mdi mdi-menu" />
            <span class="links-bar__link-text">
              {{ 'pages.posts' | globalize }}
            </span>
          </router-link>
        </nav>
      </section>

      <section class="links-bar__footer-section">
        <app-footer />
      </section>
    </aside>
  </div>
</template>

<script>
import Logo from '@/vue/common/logo.vue'
import AppFooter from '@/vue/navigation/footer.vue'

import { vueRoutes } from '@/vue-router/routes'

export default {
  name: 'links-bar',

  components: {
    Logo,
    AppFooter,
  },

  data: () => ({
    vueRoutes,
  }),
}
</script>

<style lang="scss" scoped>
@import "~@scss/variables";
@import "~@scss/mixins";

$content-item-left-padding: 4rem;
$content-item-right-padding: 2.4rem;

.links-bar {
  position: relative;
  background-color: $col-links-bar-background;
  box-shadow: inset -1rem -1rem 2rem 0 rgba(0, 0, 0, 0.03);
  min-height: 100%;

  @include respond-to-custom($links-bar-hide-bp) {
    position: fixed;
    width: 100%;
    min-height: $links-bar-bottom-height;
    max-height: $links-bar-bottom-height;
    z-index: 9999;
    bottom: 0;
  }
}

.links-bar__aside {
  width: $links-bar-width;
  min-height: 100%;
  z-index: 10;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  visibility: visible;

  @include respond-to-custom($links-bar-hide-bp) {
    width: 100%;
  }
}

.links-bar__logo-section {
  padding: 2rem $content-item-right-padding 2rem $content-item-left-padding;

  @include respond-to-custom($links-bar-hide-bp) {
    display: none;
  }
}

.links-bar__link-text {
  @include respond-to-custom($links-bar-hide-bp) {
    display: none;
  }
}

.links-bar__logo {
  width: 100%;
  display: flex;
  justify-content: center;
}

.links-bar__links-section {
  flex: 1;
}

.links-bar__links-group {
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }

  @include respond-to-custom($links-bar-hide-bp) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 0;
  }
}

.links-bar__link {
  display: flex;
  align-items: center;
  min-height: 4.8rem;
  padding: 0 $content-item-right-padding 0 $content-item-left-padding;
  cursor: pointer;
  color: $col-links-bar-text;
  text-decoration: none;

  &.router-link-active {
    background-color: $col-links-bar-active-bg;
    color: $col-text;
  }

  @include respond-to-custom($links-bar-hide-bp) {
    padding: 0;
    flex: 0 1 20%;
    max-width: 6.4rem;
    justify-content: center;

    &:nth-child(n+6) {
      display: none;
    }

    &.router-link-active {
      background-color: transparent;

      .links-bar__link-icon {
        color: $col-text;
        font-size: 4.8rem;
      }
    }
  }
}

.links-bar__link-icon {
  margin-right: 1.6rem;
  color: $col-links-bar-text;
  font-size: 2.4rem;

  .router-link-active & {
    color: $col-text;
  }

  @include respond-to-custom($links-bar-hide-bp) {
    font-size: 3.6rem;
    padding: 0.6rem;
    color: $col-text-secondary-light;
    margin-right: 0;
  }
}

.links-bar__footer-section {
  padding-top: 2rem;

  @include respond-to-custom($links-bar-hide-bp) {
    display: none;
  }
}
</style>
