<template>
  <div class="loader">
    <div class="loader__dot" />
    <div class="loader__dot" />
    <div class="loader__dot" />
    <div class="loader__dot" />
    <div class="loader__dot" />
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    message: { type: String, default: '' },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';

$min-size: 0.2rem;
$max-size: 2rem;

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 6.4rem);
}

.loader__dot {
  background: $col-primary;
  margin: 0.5rem;
  animation-name: loader;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.loader__dot:nth-child(1) {
  animation-delay: 0.2s;
}

.loader__dot:nth-child(2) {
  animation-delay: 0.4s;
}

.loader__dot:nth-child(3) {
  animation-delay: 0.6s;
}

.loader__dot:nth-child(4) {
  animation-delay: 0.8s;
}

.loader__dot:nth-child(5) {
  animation-delay: 1s;
}

@keyframes loader {
  from {
    width: $min-size;
    height: $min-size;
    border-radius: $min-size / 2;
  }
  to {
    width: $max-size;
    height: $max-size;
    border-radius: $max-size / 2;
  }
}
</style>
