<template>
  <div class="search-profiles">
    <input-field
      v-model="query"
      label=""
      placeholder="Type your search query here"
      :white-autofill="false"
    />

    <div class="search-profiles__content">
      <template v-if="isLoaded && profiles.length">
        <div class="search-profiles__cards">
          <profile-card
            v-for="profile in profiles"
            :key="profile.id"
            :profile="profile"
            @updated="updateAll"
          />
        </div>
      </template>

      <no-data-message
        v-else-if="isLoaded"
        icon-name="note-outline"
        :title="'search.no-profiles-title' | globalize"
        :message="'search.no-profiles-msg' | globalize"
      />

      <load-failed-message v-else-if="isLoadFailed" />

      <loader v-else />
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'

import InputField from '@/vue/fields/input-field.vue'
import Loader from '@/vue/common/loader.vue'
import NoDataMessage from '@/vue/common/no-data-message.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'
import ProfileCard from '@/vue/common/profile-card.vue'

import { api } from '@/api'

import { ErrorHandler } from '@/js/helpers/error-handler'

import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

const SEARCH_PROFILES_DELAY = 1000

export default {
  name: 'search-profiles',
  components: {
    InputField,
    Loader,
    NoDataMessage,
    LoadFailedMessage,
    ProfileCard,
  },

  data: _ => ({
    query: '',
    profiles: [],
    isLoaded: false,
    isLoadFailed: false,
    profilesDebouncedFunc: null,
  }),

  watch: {
    query () {
      this.refreshProfiles()
    },
  },

  async created () {
    await this.updateAll()
  },

  methods: {
    ...mapActions({
      loadFriends: vuexTypes.LOAD_FRIENDS,
      loadFriendsSentRequests: vuexTypes.LOAD_FRIENDS_SENT_REQUESTS,
      loadFriendsReceivedRequests: vuexTypes.LOAD_FRIENDS_RECEIVED_REQUESTS,
    }),

    async loadProfiles () {
      try {
        this.profiles = await api().get({
          endpoint: '/users/search',
          query: { q: this.query },
        })
        this.isLoaded = true
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    async refreshProfiles () {
      this.isLoaded = false

      if (!this.profilesDebouncedFunc) {
        this.profilesDebouncedFunc = _debounce(
          () => this.loadProfiles(),
          SEARCH_PROFILES_DELAY
        )
      }
      return this.profilesDebouncedFunc()
    },

    async updateAll () {
      this.isLoaded = false

      await Promise.all([
        this.loadFriends(),
        this.loadFriendsSentRequests(),
        this.loadFriendsReceivedRequests(),
      ])

      this.refreshProfiles()
    },
  },
}
</script>

<style scoped>
.search-profiles__content {
  margin-top: 4rem;
}

.search-profiles__cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -1rem;
}
</style>
