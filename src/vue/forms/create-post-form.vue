<template>
  <form class="app-form create-post-form" @submit.prevent="submit">
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.title"
          @blur="touchField('form.title')"
          name="create-post-title"
          :label="'create-post-form.title' | globalize"
          :error-message="getFieldErrorMessage('form.title')"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <markdown-field
          v-model="form.text"
          @blur="touchField('form.text')"
          name="create-post-text"
          :error-message="getFieldErrorMessage('form.text')"
          :label="'create-post-form.text' | globalize"
        />
      </div>
    </div>

    <div class="app__form-actions">
      <button
        type="submit"
        class="create-post-form__submit-btn app__button-primary"
        :disabled="formMixin.isDisabled"
      >
        {{ 'create-post-form.create-btn' | globalize }}
      </button>
    </div>
  </form>
</template>

<script>
import FormMixin from '@/vue/mixins/form.mixin'

import { required } from '@validators'

import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

export default {
  name: 'create-post-form',
  mixins: [FormMixin],

  data: _ => ({
    form: {
      title: '',
      text: '',
    },
  }),

  validations: {
    form: {
      title: { required },
      text: { required },
    },
  },

  methods: {
    ...mapActions({
      createPost: vuexTypes.CREATE_POST,
    }),

    async submit () {
      if (!this.isFormValid()) {
        return
      }

      this.disableForm()
      try {
        await this.createPost(this.form)
        alert('Created')
      } catch (e) {
        console.error(e)
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
