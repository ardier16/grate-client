<template>
  <div class="sidebar">
    <div
      class="sidebar__backdrop"
      :class="{ 'sidebar__backdrop--active': isOpened }"
      @click="closeSidebar"
    />

    <button
      @click="openSidebar"
      class="sidebar__burger-btn"
      :class="{ 'sidebar__burger-btn--sidebar-active': isOpened }"
    >
      <i class="mdi mdi-menu" />
    </button>

    <aside
      class="sidebar__aside"
      :class="{ 'sidebar__aside--closed': !isOpened }"
    >
      <section class="sidebar__logo-section">
        <router-link
          @click.native="closeSidebar"
          :to="vueRoutes.app"
        >
          <logo class="sidebar__logo" />
        </router-link>
      </section>

      <section class="sidebar__links-section">
        <nav class="sidebar__links-group">
          <router-link
            class="sidebar__link"
            @click.native="closeSidebar"
            :to="vueRoutes.profile"
            tag="a"
          >
            <i class="sidebar__link-icon mdi mdi-account" />
            <span>
              {{ 'pages.profile' | globalize }}
            </span>
          </router-link>

          <router-link
            class="sidebar__link"
            @click.native="closeSidebar"
            :to="vueRoutes.feed"
            tag="a"
          >
            <i class="sidebar__link-icon mdi mdi-menu" />
            <span>
              {{ 'pages.feed' | globalize }}
            </span>
          </router-link>

          <router-link
            class="sidebar__link"
            @click.native="closeSidebar"
            :to="vueRoutes.friends"
            tag="a"
          >
            <i class="sidebar__link-icon mdi mdi-account-group" />
            <span>
              {{ 'pages.friends' | globalize }}
            </span>
          </router-link>

          <router-link
            class="sidebar__link"
            @click.native="closeSidebar"
            :to="vueRoutes.profiles"
            tag="a"
          >
            <i class="sidebar__link-icon mdi mdi-account-multiple" />
            <span>
              {{ 'pages.profiles' | globalize }}
            </span>
          </router-link>

          <router-link
            class="sidebar__link"
            @click.native="closeSidebar"
            :to="vueRoutes.createPost"
            tag="a"
          >
            <i class="sidebar__link-icon mdi mdi-plus" />
            <span>
              {{ 'pages.create-post' | globalize }}
            </span>
          </router-link>
        </nav>
      </section>

      <section class="sidebar__footer-section">
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
  name: 'sidebar',

  components: {
    Logo,
    AppFooter,
  },

  data: () => ({
    isOpened: false,
    vueRoutes,
  }),

  methods: {
    openSidebar () {
      this.isOpened = true
    },

    closeSidebar () {
      this.isOpened = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@scss/variables";
@import "~@scss/mixins";

$content-item-left-padding: 4rem;
$content-item-right-padding: 2.4rem;

.sidebar {
  position: relative;
  background-color: $col-sidebar-background;
  box-shadow: inset -1rem -1rem 2rem 0 rgba(0, 0, 0, 0.03);
  min-height: 100%;
}

.sidebar__backdrop {
  @include respond-to-custom($sidebar-hide-bp) {
    position: fixed;
    left: -100%;
    top: 0;
    z-index: 115;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.sidebar__backdrop--active {
    left: $sidebar-width;
    opacity: 1;
    transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
  }
}

.sidebar__burger-btn {
  position: absolute;
  left: 0.5rem;
  top: 4.1rem;
  z-index: 10;
  width: 4rem;
  height: 4rem;
  margin-right: 0;
  margin-left: 0.8rem;
  border: none;
  outline: none;
  border-radius: 50%;
  background-color: $col-primary;
  transform: translateX($sidebar-width);
  opacity: 0;
  cursor: pointer;
  color: $col-text-inverse;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  @include respond-to-custom($sidebar-hide-bp) {
    opacity: 1;
    transform: translateX(0);
  }

  i {
    display: flex;
    justify-content: center;
    font-size: 2.4rem;
  }

  &.sidebar__burger-btn--sidebar-active {
    transform: translateX($sidebar-width);
  }
}

.sidebar__aside {
  width: $sidebar-width;
  min-height: 100%;
  z-index: 10;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  visibility: visible;

  @include respond-to-custom($sidebar-hide-bp) {
    opacity: 1;
    background-color: $col-sidebar-background;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.sidebar__aside--closed {
    @include respond-to-custom($sidebar-hide-bp) {
      opacity: 0;
      width: 0;
      visibility: hidden;
    }
  }
}

.sidebar__logo-section {
  padding: 2rem $content-item-right-padding 2rem $content-item-left-padding;

  @include respond-to-custom($sidebar-hide-bp) {
    .sidebar__aside--closed & {
      display: none;
    }
  }
}

.sidebar__logo {
  width: 100%;
  display: flex;
  justify-content: center;
}

.sidebar__links-section {
  flex: 1;

  @include respond-to-custom($sidebar-hide-bp) {
    .sidebar__aside--closed & {
      display: none;
    }
  }
}

.sidebar__links-group {
  margin-bottom: 4rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.sidebar__link {
  display: flex;
  align-items: center;
  min-height: 4.8rem;
  padding: 0 $content-item-right-padding 0 $content-item-left-padding;
  cursor: pointer;
  color: $col-sidebar-text;
  text-decoration: none;

  &.router-link-active {
    background-color: $col-sidebar-active-bg;
    color: $col-text;
    pointer-events: none;
  }
}

.sidebar__link-icon {
  margin-right: 1.6rem;
  color: $col-sidebar-text;
  font-size: 2.4rem;

  .router-link-active & {
    color: $col-text;
  }
}

.sidebar__footer-section {
  padding-top: 2rem;

  @include respond-to-custom($sidebar-hide-bp) {
    .sidebar__aside--closed & {
      display: none;
    }
  }
}
</style>
