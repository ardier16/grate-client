<template>
  <div
    class="date-field"
    :class="{
      'date-field--error': errorMessage,
      'date-field--disabled': $attrs.disabled
    }"
  >
    <datepicker
      v-model="date"
      class="date-field__picker"
      @selected="isSelected = true"
    />

    <span
      class="date-field__label"
      :class="{ 'date-field__label--default': !isSelected && !value }"
    >
      {{ label }}
    </span>

    <transition name="date-field__err-transition">
      <p v-if="errorMessage" class="date-field__err-mes">
        {{ errorMessage }}
      </p>
    </transition>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

const EVENTS = {
  input: 'input',
}

export default {
  components: { Datepicker },

  props: {
    label: { type: String, default: 'Label' },
    value: { type: [String, Date], default: undefined },
    errorMessage: { type: String, default: undefined },
  },

  data: _ => ({
    date: '',
    isSelected: false,
  }),

  watch: {
    value (value) {
      this.date = value
    },

    date (value) {
      this.$emit(EVENTS.input, value)
    },
  },

  created () {
    this.date = this.value
  },
}
</script>

<style lang="scss">
@import "scss/variables";

.date-field {
  position: relative;
  width: 100%;
  flex: 1;
}

.date-field__picker input {
  width: 100%;
  background: none;
  border: none;
  caret-color: $field-color-focused;
  color: $field-color-text;
  padding: $field-input-padding;
  cursor: pointer;

  // will work only when field not in the focus
  text-overflow: ellipsis;
  @include material-border($field-color-focused, $field-color-unfocused);
  @include text-font-sizes;
}

.date-field__label {
  position: absolute;
  left: 0;
  top: 0;
  transition: all $field-transition-duration;
  pointer-events: none;
  color: $field-color-unfocused;
  @include label-font-sizes;

  &--default {
    top: $field-input-padding-top;
    @include text-font-sizes;
  }
}

.date-field__picker input:focus ~ .date-field__label {
  color: $field-color-focused;
}

.date-field__picker input:disabled {
  cursor: default;
  filter: grayscale(100%);
  -webkit-text-fill-color: $field-color-unfocused;
  color: $field-color-unfocused;

  & ~ .date-field__label {
    filter: grayscale(100%);
  }
}

.date-field__err-mes {
  color: $field-color-error;
  margin-top: $field-error-margin-top;
  font-size: $field-error-font-size;
  line-height: $field-error-line-height;
}

.date-field--error > .date-field__label,
.date-field--error > .date-field__picker input:focus ~ .date-field__label {
  color: $field-color-error;
}
</style>
