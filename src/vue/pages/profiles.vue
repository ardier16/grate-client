<template>
  <div class="profiles">
    <template v-if="isLoaded">
      <div class="profiles__cards">
        <profile-card
          v-for="profile in profiles"
          :key="profile.id"
          :profile="profile"
          @updated="load"
        />
      </div>
    </template>

    <load-failed-message v-else-if="isLoadFailed" />

    <loader v-else />
  </div>
</template>

<script>
import Loader from '@/vue/common/loader.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'
import ProfileCard from '@/vue/common/profile-card.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'profiles',
  components: {
    Loader,
    LoadFailedMessage,
    ProfileCard,
  },

  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
  }),

  computed: {
    ...mapGetters({
      profiles: vuexTypes.profiles,
    }),
  },

  async created () {
    await this.load()
  },

  methods: {
    ...mapActions({
      loadProfiles: vuexTypes.LOAD_PROFILES,
      loadFriends: vuexTypes.LOAD_FRIENDS,
      loadFriendsSentRequests: vuexTypes.LOAD_FRIENDS_SENT_REQUESTS,
      loadFriendsReceivedRequests: vuexTypes.LOAD_FRIENDS_RECEIVED_REQUESTS,
    }),

    async load () {
      this.isLoaded = false
      try {
        await Promise.all([
          this.loadProfiles(),
          this.loadFriends(),
          this.loadFriendsSentRequests(),
          this.loadFriendsReceivedRequests(),
        ])
        this.isLoaded = true
      } catch (e) {
        this.isLoadFailed = true
      }
    },
  },
}
</script>

<style scoped>
.profiles__cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -1rem;
}
</style>
