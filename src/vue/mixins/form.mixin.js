import InputField from '@/vue/fields/input-field'
import MarkdownField from '@/vue/fields/markdown-field'
import DateField from '@/vue/fields/date-field'
import FileField from '@/vue/fields/file-field'

import { validationMixin } from 'vuelidate'

import { globalize } from '@/vue/filters/globalize'

import safeGet from 'lodash/get'

export default {
  components: {
    InputField,
    MarkdownField,
    DateField,
    FileField,
  },

  mixins: [validationMixin],

  data: _ => ({
    formMixin: {
      isDisabled: false,
      isConfirmationShown: false,
    },
  }),

  methods: {
    isFormValid () {
      const form = this.$v
      form.$touch()

      return !form.$invalid
    },

    /**
    * getFieldErrorMessage decides if the validation error is present
    * for the field. To be invalid the vuelidate $touch method should
    * be called on it. You have to call $touch on the level of your component,
    * the good time to do this is `input`, `change` or `blur` events:
    *
    *   <input-field
    *     v-model="form.email"
    *     @blur="$v.form.email.$touch()"
    *     :error-message="getFieldErrorMessage(`form.email`)"
    *  />
    *
    * @param {string} field - the string with the field name. Works also for
    *                 nested fields, such as `form.email`.
    * @param {Object} [options] - the interpolation options object for
    *                 translation.
    *
    * @returns {string} the human-readable error message if the
     *                  field is invalid, empty string - otherwise.
    */
    getFieldErrorMessage (field, options) {
      if (!this.$v.$invalid) {
        return ''
      }

      const fieldDetails = safeGet(this.$v, field)

      if (!fieldDetails.$dirty) {
        return ''
      }

      for (const rule of Object.keys(fieldDetails.$params)) {
        if (!fieldDetails[rule]) {
          return globalize(`validation.field-error`, {
            context: rule,
            ...options,
          })
        }
      }
    },

    touchField (fieldName) {
      const field = safeGet(this.$v, fieldName)
      if (field) {
        field.$touch()
      }
    },

    disableForm () {
      this.formMixin.isDisabled = true
    },

    enableForm () {
      this.formMixin.isDisabled = false
    },
  },
}
