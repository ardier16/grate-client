<template>
  <transition name="modal-transition">
    <div class="modal" v-if="isShown">
      <div
        class="modal__backdrop"
        @click="closeSelf"
      />
      <div class="modal__body">
        <slot />
        <button
          class="app__button-icon modal__close-btn"
          @click="closeSelf"
        >
          <i class="mdi mdi-close modal__close-icon" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { KEY_CODES } from '@/js/const/key-codes.const'

const EVENTS = {
  updateIsShown: 'update:isShown',
}

export default {
  name: 'modal',

  props: {
    isShown: { type: Boolean, default: true },
  },

  created () {
    document.addEventListener('keydown', this.onDocumentKeyDown)
  },
  destroyed () {
    document.removeEventListener('keydown', this.onDocumentKeyDown)
  },
  methods: {
    onDocumentKeyDown () {
      const keyCode = event.which || event.keyCode

      if (keyCode === KEY_CODES.escape) {
        this.closeSelf()
      }
    },

    closeSelf () {
      this.$emit(EVENTS.updateIsShown, false)
    },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';
@import '~@scss/mixins';

$media-small: 460px;

.modal {
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
}

.modal__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-color: $col-modal-backdrop-bg;
}

.modal__close-btn {
  position: absolute;
  right: 0.4rem;
  top: 0.4rem;
  padding: 0;
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__close-icon {
  display: flex;
  font-size: 2.6rem;
  margin-top: -0.2rem;

  &:before {
    font-weight: 700;
    vertical-align: middle;
  }
}

.modal__body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 70rem;
  height: 50rem;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 1rem 2rem 0 $col-modal-backdrop-bg;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  background-color: $col-modal-bg;
  flex: 1;
  border-radius: 1rem;

  // allows to scroll modal content when it height more than modal height
  overflow-y: auto;

  @include respond-to-height($media-small) {
    padding: 1rem 1.5rem;
  }
}

.modal-transition-enter-active {
  animation-duration: 0.2s;

  /*
    Disabled because with this nesting we can shiny see where this animation
    used
  */
  /* stylelint-disable selector-nested-pattern */
  & > .modal__backdrop {
    animation: modal-backdrop-keyframes 0.2s ease-in-out;
  }

  & > .modal__pane {
    animation: modal-pane-keyframes 0.2s ease-in-out;
  }
  /* stylelint-enable selector-nested-pattern */
}

.modal-transition-leave-active {
  /*
    overall duration should be less than nested durations,
    to prevent animation flickering after animation ended
    but the element still present
  */
  animation-duration: 0.13s;

  /*
    Disabled because with this nesting we can shiny see where this animation
    used
  */
  /* stylelint-disable selector-nested-pattern */
  & > .modal__backdrop {
    animation: modal-backdrop-keyframes 0.2s ease-in-out reverse;
  }

  & > .modal__pane {
    animation: modal-pane-keyframes 0.2s ease-in-out reverse;
  }
  /* stylelint-enable selector-nested-pattern */
}

@keyframes modal-backdrop-keyframes {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modal-pane-keyframes {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
