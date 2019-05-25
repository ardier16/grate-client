<template>
  <div class="user-avatar">
    <img
      v-if="user.avatarUrl"
      class="user-avatar__content user-avatar__content--image"
      :src="user.avatarUrl"
    >

    <p
      v-else
      class="user-avatar__content user-avatar__content--abbr"
    >
      {{ (user.name || user.login) | abbreviate }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'user-avatar',

  props: {
    user: { type: Object, required: true },
  },
}
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.user-avatar__content {
  margin: 0 auto;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  &--image {
    display: block;
  }

  &--abbr {
    font-size: 3.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $col-primary;
    color: $col-text-inverse;
  }
}
</style>
