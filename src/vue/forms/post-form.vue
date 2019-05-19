<template>
  <form class="app-form post-form" @submit.prevent="submit">
    <div class="app__form-row">
      <div class="app__form-field">
        <input-field
          v-model="form.title"
          @blur="touchField('form.title')"
          name="post-title"
          :label="'post-form.title' | globalize"
          :error-message="getFieldErrorMessage('form.title')"
        />
      </div>
    </div>

    <div class="app__form-row">
      <div class="app__form-field">
        <markdown-field
          v-model="form.text"
          @blur="touchField('form.text')"
          name="post-text"
          :error-message="getFieldErrorMessage('form.text')"
          :label="'post-form.text' | globalize"
        />
      </div>
    </div>

    <div class="app__form-actions">
      <button
        type="submit"
        class="post-form__submit-btn app__button-primary"
        :disabled="formMixin.isDisabled"
      >
        <template v-if="post">
          {{ 'post-form.update-btn' | globalize }}
        </template>

        <template v-else>
          {{ 'post-form.create-btn' | globalize }}
        </template>
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
import { Bus } from '@/js/helpers/event-bus'

const EVENTS = {
  submit: 'submit',
}

export default {
  name: 'post-form',
  mixins: [FormMixin],

  props: {
    post: { type: Object, default: null },
  },

  data: _ => ({
    form: {
      title: '',
      text: '',
      id: '',
    },
  }),

  validations: {
    form: {
      title: { required },
      text: { required },
    },
  },

  created () {
    if (this.post) {
      this.form.title = this.post.title
      this.form.text = this.post.text
      this.form.id = this.post._id
    }
  },

  methods: {
    ...mapActions({
      createPost: vuexTypes.CREATE_POST,
      updatePost: vuexTypes.UPDATE_POST,
    }),

    async submit () {
      if (!this.isFormValid()) {
        return
      }

      this.disableForm()
      try {
        if (this.post) {
          await this.updatePost(this.form)
        } else {
          await this.createPost(this.form)
        }

        Bus.success('post-form.post-created-msg')
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
</style>
