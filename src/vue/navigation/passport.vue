<template>
  <div class="passport">
    <button @click="toggleDropdown">
      <img
        v-if="profile.avatarUrl"
        class="passport__avatar passport__avatar-image"
        :src="profile.avatarUrl"
      >
      <p
        v-else
        class="passport__avatar passport__name-abbr-btn"
      >
        {{ profile.name | abbreviate }}
      </p>
    </button>

    <div class="passport__account-details-wrp">
      <button
        class="passport__name-btn"
        @click="toggleDropdown"
      >
        {{ profile.name }}
        <i
          class="passport__dropdown-status-icon mdi mdi-chevron-down"
          :class="{
            'mdi-rotate-180': isDropdownOpen
          }"
        />
      </button>

      <p class="passport__online-status">
        {{ 'passport.online-msg' | globalize }}
      </p>
    </div>

    <transition name="passport__dropdown">
      <div
        class="passport__dropdown"
        v-if="isDropdownOpen"
      >
        <div class="passport__dropdown-signed-in-wrp">
          <span class="passport__dropdown-signed-in-email-prefix">
            {{ 'passport.signed-in-as' | globalize }}
          </span>
          <br>
          <span class="passport__dropdown-signed-in-email">
            {{ profile.name }}
          </span>
        </div>

        <div class="passport__dropdown-actions-wrp">
          <button
            class="app__button-primary
                   passport__dropdown-btn"
            @click="processSignOut"
          >
            {{ 'passport.sign-out-btn' | globalize }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { handleClickOutside } from '@/js/helpers/handle-click-outside'

import { vuexTypes } from '@/vuex'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'passport',

  data: () => ({
    isDropdownOpen: false,
    destructClickOutsideHandler: () => { },
  }),

  computed: {
    ...mapGetters({
      profile: vuexTypes.profile,
    }),
  },

  methods: {
    ...mapMutations({
      signOut: vuexTypes.SIGN_OUT,
      clearState: vuexTypes.CLEAR_STATE,
    }),

    toggleDropdown () {
      if (this.isDropdownOpen) {
        this.closeDropdown()
      } else {
        this.openDropdown()
      }
    },

    openDropdown () {
      this.isDropdownOpen = true
      this.destructClickOutsideHandler = handleClickOutside(
        '.passport',
        this.closeDropdown
      )
    },

    closeDropdown () {
      this.destructClickOutsideHandler()
      this.isDropdownOpen = false
    },

    processSignOut () {
      this.closeDropdown()
      this.signOut()
      this.clearState()
      location.reload()
    },
  },
}
</script>

<style lang="scss">
@import '~@scss/variables';
@import '~@scss/mixins';

$media-hide-account-details-bp: 800px;
$dropdown-item-side-padding: 2.4rem;

.passport__dropdown-btn {
  width: 100%;
}

.passport__dropdown-signed-in-email-prefix {
  font-weight: 700;
  font-size: 1.2rem;
}

.passport {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.passport__avatar {
  cursor: pointer;
  width: 5.5rem;
  height: 5.5rem;

  @include box-shadow();
}

.passport__avatar-image {
  border-radius: 50%;
}

.passport__name-abbr-btn {
  width: 5.5rem;
  height: 5.5rem;
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $col-block-bg;
  color: $col-text;
}

.passport__name-btn,
.passport__name-btn-icon {
  font-size: 1.8rem;
  color: $col-text;
  vertical-align: middle;
}

.passport__name-btn-icon {
  &:before {
    transition: 0.3s ease-out;
    will-change: transform;
  }

  &--dropdown-opened:before {
    transform: rotate(-180deg);
  }
}

.passport__account-details-wrp {
  display: flex;
  flex-direction: column;
  margin-left: 1.6rem;

  @include respond-to-custom($media-hide-account-details-bp) {
    display: none;
  }
}

.passport__online-status {
  margin-top: 0.2rem;

  &:before {
    font-size: 1.6rem;
    content: '\2022';
    color: $col-success;
  }
}

.passport__dropdown {
  position: absolute;
  padding: 1rem;
  right: 0;
  top: 100%;
  background: $col-block-bg;
  display: flex;
  flex-direction: column;

  @include box-shadow();

  &:before {
    // dropdown arrow
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0.8rem 0.8rem;
    border-color: transparent transparent $col-block-bg transparent;
    top: -0.8rem;
    right: 3.9rem;
  }
}

.passport__dropdown-enter-active {
  animation: passport-dropdown-keyframes 0.2s ease-in-out;
  animation-duration: 0.2s;
}

.passport__dropdown-leave-active {
  animation: passport-dropdown-keyframes 0.2s ease-in-out reverse;
  animation-duration: 0.2s;
}

@keyframes passport-dropdown-keyframes {
  from {
    opacity: 0;
    margin-top: -1.2rem;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
}

.passport__dropdown-signed-in-wrp,
.passport__dropdown-balances-wrp {
  padding: 1.6rem $dropdown-item-side-padding 0;
  line-height: 1.5;
  text-align: left;
  color: $col-text;
  font-size: 1.4rem;
}

.passport__dropdown-actions-wrp {
  padding: 1.6rem 0 0.6rem;
}

.passport__dropdown-status-icon {
  &:before {
    transition: 0.2s ease-out;
  }
}
</style>
