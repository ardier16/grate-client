<template>
  <form class="app-form auth-form" @submit.prevent="submit">
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.email"
          @blur="touchField('form.email')"
          name="sign-up-email"
          :label="'auth-pages.email' | globalize"
          :error-message="getFieldErrorMessage('form.email')"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.login"
          @blur="touchField('form.login')"
          name="sign-up-login"
          :label="'auth-pages.username' | globalize"
          :error-message="getFieldErrorMessage('form.login')"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.password"
          @blur="touchField('form.password')"
          name="sign-up-password"
          type="password"
          :error-message="getFieldErrorMessage('form.password')"
          :label="'auth-pages.password' | globalize"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.confirmPassword"
          @blur="touchField('form.confirmPassword')"
          id="sign-up-confirm-password"
          type="password"
          :error-message="getFieldErrorMessage('form.confirmPassword')"
          :label="'auth-pages.confirm-password' | globalize"
        />
      </div>
    </div>

    <div class="app__form-actions">
      <button
        type="submit"
        class="auth-form__submit-btn"
        :disabled="formMixin.isDisabled"
      >
        {{ 'auth-pages.sign-up' | globalize }}
      </button>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'

import {
  email,
  required,
  password,
  sameAs,
} from '@validators'

import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'sign-up-form',
  mixins: [FormMixin],

  data: _ => ({
    form: {
      email: '',
      login: '',
      password: '',
      confirmPassword: '',
    },
  }),

  validations: {
    form: {
      email: { required, email },
      login: { required },
      password: { required, password },
      confirmPassword: {
        required,
        password,
        sameAsPassword: sameAs(function () { return this.form.password }),
      },
    },
  },

  methods: {
    ...mapActions({
      signUp: vuexTypes.SIGN_UP,
      loadProfile: vuexTypes.LOAD_PROFILE,
    }),

    async submit () {
      if (!this.isFormValid()) {
        return
      }

      this.disableForm()
      try {
        await this.signUp({
          email: this.form.email.toLowerCase(),
          login: this.form.login.toLowerCase(),
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
