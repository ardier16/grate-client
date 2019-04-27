<template>
  <div class="file-field">
    <div class="file-field__label">
      {{ label }}
    </div>
    <button
      class="file-input app__button-primary"
      :class="{ 'file-input--disabled': $attrs.disabled }"
    >
      {{ value ? value.name : 'file-field.title' | globalize }}

      <input
        v-bind="$attrs"
        type="file"
        class="file-field__file-input"
        :accept="accept"
        title=""
        @change="onChange"
      >
    </button>

    <div
      class="file-field__err-mes"
      v-if="errorMessage"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
const EVENTS = {
  input: 'input',
}

export default {
  name: 'file-field',
  props: {
    value: { type: File, default: null },
    label: { type: String, default: '' },
    accept: { type: String, default: '*' },
    errorMessage: { type: String, default: undefined },
  },

  computed: {
    maxSizeBytes () {
      return this.maxSize * 1024 * 1024
    },
  },

  methods: {
    onChange (event) {
      const file = this.getFileFromEvent(event)
      this.$emit(EVENTS.input, file)
    },

    getFileFromEvent (event) {
      const files = event.target.files || event.dataTransfer.files
      return files[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import "scss/variables";

.file-field {
  display: flex;
  flex-direction: column;
}

.file-field__label {
  font-size: 1.1rem;
  color: $field-color-unfocused;
  margin-bottom: 1.2rem;
}

.file-input {
  transition: 0.2s;
  width: 100%;
  max-width: 20rem;
  position: relative;
  padding-bottom: 0.6rem;

  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    opacity: 0;
    height: 100%;
    width: 100%;
  }

  &:not(.file-input--disabled):hover {
    border-color: $field-color-text;
  }
}

.file-input--disabled {
  filter: grayscale(100%);

  input[type='file'] {
    cursor: default;
  }
}

.file-field__err-mes {
  color: $field-color-error;
  margin-top: $field-error-margin-top;
  font-size: $field-error-font-size;
  line-height: $field-error-line-height;
}
</style>
