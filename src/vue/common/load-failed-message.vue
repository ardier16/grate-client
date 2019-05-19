<template>
  <div class="load-failed-msg">
    <i class="mdi mdi-alert-circle load-failed-msg__icon" />

    <h3 class="load-failed-msg__title">
      {{ title || 'load-failed-message.default-title' | globalize }}
    </h3>

    <p class="load-failed-msg__message">
      {{ message || 'load-failed-message.default-msg' | globalize }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'load-failed-msg',
  props: {
    title: { type: String, default: '' },
    message: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';

.load-failed-msg {
  text-align: center;
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 0.8rem;
  color: $col-danger;
}

.load-failed-msg__title {
  margin-bottom: 0.8rem;
  font-size: 2rem;
}

.load-failed-msg__icon {
  font-size: 6.4rem;
}
</style>
