<template>
  <form class="app-form profile-form" @submit.prevent="submit">
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.name"
          name="profile-name"
          :label="'profile-form.name' | globalize"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.birthDate"
          name="profile-birth-date"
          :label="'profile-form.birth-date' | globalize"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.status"
          name="profile-status"
          :label="'profile-form.status' | globalize"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.avatarUrl"
          name="profile-avatar-url"
          :label="'profile-form.avatar-url' | globalize"
        />
      </div>
    </div>

    <div class="app__form-actions">
      <button
        type="submit"
        class="profile-form__submit-btn app__button-primary"
        :disabled="formMixin.isDisabled"
      >
        {{ 'profile-form.update-btn' | globalize }}
      </button>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'

import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

export default {
  name: 'profile-form',
  mixins: [FormMixin],

  data: _ => ({
    form: {
      name: '',
      birthDate: '',
      status: '',
      avatarUrl: '',
    },
  }),

  methods: {
    ...mapActions({
      signIn: vuexTypes.SIGN_IN,
    }),

    async submit () {
      this.disableForm()
      try {
      } catch (e) {
        alert(e.message)
      }
      this.enableForm()
    },
  },
}
</script>

<style lang="scss" scoped>
@import './app-form';
</style>
