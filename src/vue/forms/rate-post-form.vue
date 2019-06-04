<template>
  <form class="app-form rate-post-form" @submit.prevent="submit">
    <h3 class="rate-post-form__header">
      Rate a post
    </h3>
    <div class="app__form-row">
      <div class="rate-post-form__factors">
        <div
          v-for="factor in factors"
          :key="factor.id"
          class="rate-post-form__factor"
        >
          <h4 class="rate-post-form__rate-factor">
            {{ `factor-types.${factor.code}` | globalize }}
          </h4>

          <p class="rate-post-form__rate-setter">
            <rate-setter
              :rate="getRateValue(factor)"
              @updated="updateRate($event, factor)"
            />
          </p>
        </div>
      </div>
    </div>

    <div class="rate-post-form__actions">
      <button
        type="submit"
        class="rate-post-form__submit-btn app__button-primary"
        :disabled="formMixin.isDisabled"
      >
        {{ 'rate-post-form.update-btn' | globalize }}
      </button>
    </div>
  </form>
</template>

<script>
import RateSetter from '@/vue/common/rate-setter.vue'

import FormMixin from '@/vue/mixins/form.mixin'

import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'

import { api } from '@/api'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

const EVENTS = {
  submit: 'submit',
}

export default {
  name: 'comment-form',
  components: {
    RateSetter,
  },
  mixins: [FormMixin],

  props: {
    post: { type: Object, required: true },
    factors: { type: Array, required: true },
  },

  data: _ => ({
    form: {
      rates: [],
    },
  }),

  computed: {
    ...mapGetters({
      userId: vuexTypes.userId,
      token: vuexTypes.authToken,
    }),

    userRates () {
      return this.post.rates
        .filter(rate => rate.ownerId === this.userId)
        .map(rate => {
          return {
            factorId: rate.factorId,
            code: this.factors.find(f => f.id === rate.factorId).code,
            value: rate.value,
          }
        })
    },
  },

  created () {
    this.rates = this.userRates.slice(0)
  },

  methods: {
    getRateValue (factor) {
      const rate = this.rates.find(r => r.factorId === factor.id)
      return rate ? rate.value : 0
    },

    updateRate (value, factor) {
      const rate = this.rates.find(rate => rate.factorId === factor.id)
      if (rate) {
        rate.value = value
      } else {
        this.rates.push({
          factorId: factor.id,
          code: factor.code,
          value,
        })
      }

      this.$forceUpdate()
    },

    async submit () {
      this.disableForm()
      try {
        await Promise.all(this.rates.map(rate => {
          return api().post({
            endpoint: `/posts/${this.post.id}/rate`,
            data: {
              factorCode: rate.code,
              value: rate.value,
            },
            token: this.token,
          })
        }))

        Bus.success('rate-post-form.rates-updated-msg')
        this.$emit(EVENTS.submit)
      } catch (e) {
        ErrorHandler.process(e)
      }
      this.enableForm()
    },
  },
}
</script>

<style lang="scss" scoped>
@import './app-form';

.rate-post-form__factors {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: -1rem;
}

.rate-post-form__factor {
  margin: 1rem;
}

.rate-post-form__actions {
  margin-top: 4rem;
}

.rate-post-form__header {
  font-size: 2.4rem;
}

.rate-post-form__rate-factor {
  font-size: 1.8rem;
}
</style>
