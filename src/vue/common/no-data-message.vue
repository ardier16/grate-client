<template>
  <div class="no-data-message">
    <i
      v-if="iconName"
      :class="`mdi mdi-${iconName}`"
      class="no-data-message__icon"
    />

    <h3 class="no-data-message__title">
      {{ title }}
    </h3>

    <p class="no-data-message__message">
      {{ message }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'no-data-message',
  props: {
    iconName: { type: String, default: '' },
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';

.no-data-message {
  text-align: center;
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 0.8rem;
}

.no-data-message__title {
  margin-bottom: 0.8rem;
  font-size: 2rem;
  color: $col-text;
}

.no-data-message__message {
  color: $col-text;
}

.no-data-message__icon {
  color: $col-primary;
  font-size: 6.4rem;
}
</style>
