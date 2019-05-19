<template>
  <div class="app__container">
    <template v-if="isSignedIn">
      <sidebar />

      <div class="app__main-content">
        <div class="app__navbar">
          <navbar />
        </div>

        <div class="app__main">
          <router-view />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Navbar from '@/vue/navigation/navbar.vue'
import Sidebar from '@/vue/navigation/sidebar.vue'

import { mapGetters } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  name: 'app-content',

  components: {
    Navbar,
    Sidebar,
  },

  computed: {
    ...mapGetters({
      isSignedIn: vuexTypes.isSignedIn,
    }),
  },
}
</script>

<style lang="scss">
@import "~@scss/mixins";
@import "~@scss/variables";

.app__container {
  display: flex;
  align-items: stretch;
  overflow-x: hidden;
  flex: 1;
}

.app__main-content {
  flex: 1;
  overflow: hidden;
}

.app__navbar {
  position: relative;
  z-index: 4;
  min-height: 6.4rem;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: opacity, background-color, box-shadow, transform, color,
    min-height, -webkit-transform;
  will-change: opacity, background-color, box-shadow, transform, color,
    min-height;
}

.app__main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: $content-padding-top $content-padding-right
    $content-padding-bottom $content-padding-left;
  background-color: $col-app-background;

  @include respond-to-custom($sidebar-hide-bp) {
    width: 100vw;
    padding: 0 $content-side-paddings-sm 3rem;
  }
}
</style>
