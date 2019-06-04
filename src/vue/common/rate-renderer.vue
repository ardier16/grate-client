<template>
  <div class="rate-renderer">
    <div v-for="n in MAX_RATE" :key="n">
      <template v-if="rate >= n">
        <i class="mdi mdi-star rate-renderer__icon" />
      </template>

      <template v-else-if="rate < n && rate + 1 > n">
        <div class="rate-renderer__icon-wrp">
          <i class="mdi mdi-star-outline rate-renderer__icon" />
          <i
            class="mdi
                   mdi-star
                   rate-renderer__icon
                   rate-renderer__icon--partial"
            :style="{ 'clip-path': `inset(0 ${rateCoef}% 0 0)` }"
          />
        </div>
      </template>

      <template v-else>
        <i class="mdi mdi-star-outline rate-renderer__icon" />
      </template>
    </div>
  </div>
</template>

<script>
const MAX_RATE = 5

export default {
  name: 'rate-renderer',

  props: {
    rate: { type: Number, required: true },
  },

  data: _ => ({
    MAX_RATE,
  }),

  computed: {
    rateCoef () {
      return 25 + (1 - (this.rate - Math.floor(this.rate))) * 50
    },
  },
}
</script>

<style lang="scss" scoped>
.rate-renderer {
  display: flex;
}

.rate-renderer__icon-wrp {
  position: relative;
}

.rate-renderer__icon {
  font-size: 4rem;
}

.rate-renderer__icon--partial {
  position: absolute;
  top: 0;
  left: 0;
}

</style>
