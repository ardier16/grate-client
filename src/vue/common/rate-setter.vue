<template>
  <div class="rate-setter">
    <div
      v-for="n in MAX_RATE"
      :key="n"
      class="rate-setter__star"
      @mouseover="currentRate = n"
      @mouseleave="currentRate = rate"
      @click="$emit('updated', currentRate)"
    >
      <template v-if="currentRate >= n">
        <i class="mdi mdi-star rate-setter__icon" />
      </template>

      <template v-else>
        <i class="mdi mdi-star-outline rate-setter__icon" />
      </template>
    </div>
  </div>
</template>

<script>
const MAX_RATE = 5

export default {
  name: 'rate-setter',

  props: {
    rate: { type: Number, required: true },
  },

  data: _ => ({
    currentRate: 0,
    MAX_RATE,
  }),

  created () {
    this.currentRate = this.rate
  },
}
</script>

<style lang="scss" scoped>
.rate-setter {
  display: flex;
}

.rate-setter__star {
  cursor: pointer;
}

.rate-setter__icon-wrp {
  position: relative;
}

.rate-setter__icon {
  font-size: 4rem;
}
</style>
