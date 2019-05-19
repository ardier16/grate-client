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
        <date-field
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
        <file-field
          v-model="form.avatar"
          name="profile-avatar"
          :label="'profile-form.avatar' | globalize"
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
import { mapActions, mapGetters } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

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

  computed: {
    ...mapGetters({
      profile: vuexTypes.profile,
    }),
  },

  async created () {
    try {
      await this.loadProfile()

      if (this.profile) {
        this.populateForm()
      }
    } catch (e) {
      ErrorHandler.process(e)
    }
  },

  methods: {
    ...mapActions({
      createProfile: vuexTypes.CREATE_PROFILE,
      updateProfile: vuexTypes.UPDATE_PROFILE,
      loadProfile: vuexTypes.LOAD_PROFILE,
    }),

    populateForm () {
      this.form = {
        name: this.profile.name,
        birthDate: this.profile.birthDate,
        status: this.profile.status,
        avatarUrl: this.profile.avatarUrl,
      }
    },

    async submit () {
      this.disableForm()
      try {
        if (this.profile) {
          await this.updateProfile(this.form)
        } else {
          await this.createProfile(this.form)
        }
        Bus.success('profile-form.profile-updated-msg')
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
</style>
