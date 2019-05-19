<template>
  <form class="app-form auth-form" @submit.prevent="submit">
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.email"
          @blur="touchField('form.email')"
          name="sign-in-email"
          :label="'auth-pages.email' | globalize"
          :error-message="getFieldErrorMessage('form.email')"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.password"
          @blur="touchField('form.password')"
          name="sign-in-password"
          type="password"
          :error-message="getFieldErrorMessage('form.password')"
          :label="'auth-pages.password' | globalize"
        />
      </div>
    </div>

    <div class="app__form-actions">
      <button
        type="submit"
        class="auth-form__submit-btn"
        :disabled="formMixin.isDisabled"
      >
        {{ 'auth-pages.sign-in' | globalize }}
      </button>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'

import { required } from '@validators'

import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'sign-in-form',
  mixins: [FormMixin],

  data: _ => ({
    form: {
      email: '',
      password: '',
    },
  }),

  validations: {
    form: {
      email: { required },
      password: { required },
    },
  },

  methods: {
    ...mapActions({
      signIn: vuexTypes.SIGN_IN,
      loadProfile: vuexTypes.LOAD_PROFILE,
    }),

    async submit () {
      if (!this.isFormValid()) {
        return
      }

      this.disableForm()
      try {
        await this.signIn({
          login: this.form.email.toLowerCase(),
          password: this.form.password,
        })
        await this.loadProfile()

        this.$router.push({ name: 'app' })
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
@import './auth-form';
</style>
