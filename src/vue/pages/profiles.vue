<template>
  <div class="profiles">
    <template v-if="isLoaded && profiles.length">
      <div class="profiles__cards">
        <div
          v-for="profile in profiles"
          :key="profile.id"
          class="profiles__card"
        >
          <div class="profiles__card-avatar">
            <img
              v-if="profile.avatarUrl"
              class="profiles__card-avatar profiles__card-avatar--image"
              :src="profile.avatarUrl"
            >

            <p
              v-else
              class="profiles__card-avatar profiles__card-avatar--abbr"
            >
              {{ profile.name | abbreviate }}
            </p>
          </div>

          <h3
            class="profiles__card-title"
            :title="profile.name"
          >
            {{ profile.name }}
          </h3>

          <p
            class="profiles__card-status"
            :title="profile.status"
          >
            {{ profile.status }}
          </p>

          <button
            v-if="profile.userId !== userId"
            class="app__button-primary profiles__add-friend-btn"
          >
            {{ 'profiles.add-friend-btn' | globalize }}
          </button>
        </div>
      </div>
    </template>

    <no-data-message
      v-else-if="isLoaded"
      icon-name="note-outline"
      :title="'profiles.no-profiles-title' | globalize"
      :message="'profiles.no-profiles-msg' | globalize"
    />

    <load-failed-message v-else-if="isLoadFailed" />

    <loader v-else />
  </div>
</template>

<script>
import Loader from '@/vue/common/loader.vue'
import NoDataMessage from '@/vue/common/no-data-message.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'profiles',
  components: {
    Loader,
    NoDataMessage,
    LoadFailedMessage,
  },

  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
  }),

  computed: {
    ...mapGetters({
      profiles: vuexTypes.profiles,
      userId: vuexTypes.userId,
    }),
  },

  async created () {
    try {
      await this.loadProfiles()
      this.isLoaded = true
    } catch (e) {
      this.isLoadFailed = true
    }
  },

  methods: {
    ...mapActions({
      loadProfiles: vuexTypes.LOAD_PROFILES,
    }),

    async refreshProfiles () {
      this.isLoaded = false
      try {
        await this.loadProfiles()
        this.isLoaded = true
      } catch (e) {
        ErrorHandler.process(e)
      }
    },
  },
}
</script>

<style lang="scss">
@import '@scss/variables';
@import '@scss/mixins';

$profile-card-margin: 1rem;

$media-small-desktop: 960px;

.profiles__cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -1rem;
}

@mixin profile-card-width ($width) {
  flex: 0 1 calc(#{$width} - (#{$profile-card-margin} * 2));
  max-width: calc(#{$width} - (#{$profile-card-margin} * 2));
}

.profiles__card {
  margin: $profile-card-margin;
  background-color: $col-block-bg;
  padding: 2.4rem;
  border-radius: 0.5rem;
  min-height: 25rem;
  cursor: pointer;

  @include box-shadow();
  @include profile-card-width(33%);

  @include respond-to-custom($media-small-desktop) {
    @include profile-card-width(50%);
  }

  @include respond-to(small) {
    @include profile-card-width(100%);
  }
}

.profiles__card-avatar {
  margin: 0 auto;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;

  &--image {
    display: block;
  }

  &--abbr {
    font-size: 3.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $col-primary;
    color: $col-text-inverse;
  }
}

.profiles__card-title {
  font-size: 2.4rem;
  text-align: center;
  margin-top: 2rem;
}

.profiles__card-status {
  margin-top: 0.6rem;
  text-align: right;
  font-style: italic;
}

.profiles__add-friend-btn {
  margin-top: 2.4rem;
}
</style>
