<template>
  <div class="auth">
    <div class="auth__titles">
      <logo class="auth__title-logo" inverse />
      <h1 class="auth__title">
        {{ 'auth-pages.title' | globalize }}
      </h1>
    </div>

    <div class="auth__form">
      <logo class="auth__logo" />
      <router-view />
      <section class="auth__footer-section">
        <app-footer />
      </section>
    </div>
  </div>
</template>

<script>
import Logo from '@/vue/common/logo.vue'
import AppFooter from '@/vue/navigation/footer.vue'

export default {
  name: 'auth',
  components: {
    Logo,
    AppFooter,
  },
}
</script>

<style lang="scss" scoped>
@import '~@scss/mixins';
@import '~@scss/variables';

.auth {
  display: flex;
  flex: 1;
}

.auth__titles,
.auth__form {
  width: 50%;
}

.auth__titles {
  background: $col-primary;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 11rem;

  @include respond-to(large) {
    padding: 0 7rem;
  }

  @include respond-to(medium) {
    display: none;
  }
}

.auth__title {
  color: $col-text-inverse;
  font-size: 5.6rem;
  line-height: 1.2;

  @include respond-to(large) {
    font-size: 4rem;
  }
}

.auth__form {
  padding: 8rem 11rem;
  position: relative;

  @include respond-to(large) {
    padding: 6rem 7rem;
  }

  @include respond-to(medium) {
    margin: 0 auto;
    max-width: 48rem;
    padding: 6rem 1.6rem;
    width: 100%;
  }
}

.auth__logo {
  display: inline-block;
  margin-bottom: 16.5rem;

  @include respond-to-height(950px) {
    margin-bottom: 12rem;
  }

  @include respond-to-height(750px) {
    margin-bottom: 6.4rem;
  }
}

.auth__footer-section {
  padding: 1.6rem;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
