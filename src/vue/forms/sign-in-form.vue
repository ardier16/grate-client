<template>
  <form class="app-form auth-form" @submit.prevent="submit">
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.login"
          @blur="touchField('form.login')"
          name="sign-in-login"
          :label="'auth-pages.login' | globalize"
          :error-message="getFieldErrorMessage('form.login')"
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
        class="auth-form__submit-btn"
        :disabled="formMixin.isDisabled"
      >
        {{ 'auth-pages.sign-in' | globalize }}
      </button>

      <button
        type="submit"
        class="auth-form__submit-btn auth-form__google-btn"
        :disabled="formMixin.isDisabled"
      >
        {{ 'auth-pages.sign-in-with-google' | globalize }}
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
      login: '',
      password: '',
    },
  }),

  validations: {
    form: {
      login: { required },
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
          login: this.form.login.toLowerCase(),
          password: this.form.password,
        })
        await this.loadProfile()

        if (this.$route.query.redirectPath) {
          this.$router.push({ path: this.$route.query.redirectPath })
        } else {
          this.$router.push({ name: 'app' })
        }
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
