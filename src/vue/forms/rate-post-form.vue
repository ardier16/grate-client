<template>
  <form class="app-form comment-form" @submit.prevent="submit">
    <div class="app__form-row">
      <div class="app__form-field">
        <text-field
          v-model="form.text"
          @blur="touchField('form.text')"
          name="comment-text"
          rows="3"
          :error-message="getFieldErrorMessage('form.text')"
          :label="'comment-form.text' | globalize"
        />
      </div>
    </div>

    <div class="comment-form__actions">
      <button
        type="submit"
        class="comment-form__submit-btn app__button-primary"
        :disabled="formMixin.isDisabled"
      >
        <template v-if="comment">
          {{ 'comment-form.update-btn' | globalize }}
        </template>

        <template v-else>
          {{ 'comment-form.add-btn' | globalize }}
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
  name: 'comment-form',
  mixins: [FormMixin],

  props: {
    postId: { type: String, required: true },
    comment: { type: Object, default: null },
  },

  data: _ => ({
    form: {
      id: '',
      text: '',
    },
  }),

  validations: {
    form: {
      text: { required },
    },
  },

  created () {
    if (this.comment) {
      this.form.title = this.comment.title
      this.form.text = this.comment.text
      this.form.id = this.comment.id
    }
  },

  methods: {
    ...mapActions({
      createComment: vuexTypes.CREATE_COMMENT,
      updateComment: vuexTypes.UPDATE_COMMENT,
    }),

    async submit () {
      if (!this.isFormValid()) {
        return
      }

      this.disableForm()
      try {
        if (this.comment) {
          await this.updateComment({
            ...this.form,
            postId: this.postId,
          })
        } else {
          await this.createComment({
            ...this.form,
            postId: this.postId,
          })
        }

        Bus.success('comment-form.comment-updated-msg')
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

.comment-form__actions {
  margin-top: 2.4rem;
}
</style>
