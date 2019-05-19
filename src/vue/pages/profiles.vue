<template>
  <div class="profiles">
    <template v-if="isLoaded">
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

          <div class="profiles__card-actions">
            <template v-if="needReview(profile.userId)">
              <button
                class="app__button-primary app__button-primary--success"
                @click="approveRequest(profile.userId)"
              >
                {{ 'profiles.approve-btn' | globalize }}
              </button>

              <button
                class="app__button-primary app__button-primary--danger"
                @click="rejectRequest(profile.userId)"
              >
                {{ 'profiles.reject-btn' | globalize }}
              </button>
            </template>

            <template v-else>
              <button
                v-if="profile.userId !== userId"
                class="app__button-primary"
                @click="addFriend(profile.userId)"
                :disabled="isFriend(profile.userId) ||
                  isPendingRequest(profile.userId)"
              >
                <template v-if="isFriend(profile.userId)">
                  {{ 'profiles.friend-btn' | globalize }}
                </template>

                <template v-else-if="isPendingRequest(profile.userId)">
                  {{ 'profiles.requested-btn' | globalize }}
                </template>

                <template v-else>
                  {{ 'profiles.add-friend-btn' | globalize }}
                </template>
              </button>
            </template>
          </div>
        </div>
      </div>
    </template>

    <load-failed-message v-else-if="isLoadFailed" />

    <loader v-else />
  </div>
</template>

<script>
import Loader from '@/vue/common/loader.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'profiles',
  components: {
    Loader,
    LoadFailedMessage,
  },

  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
  }),

  computed: {
    ...mapGetters({
      profiles: vuexTypes.profiles,
      friends: vuexTypes.friends,
      friendsSentRequests: vuexTypes.friendsSentRequests,
      friendsReceivedRequests: vuexTypes.friendsReceivedRequests,
      userId: vuexTypes.userId,
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
      sendFriendRequest: vuexTypes.SEND_FRIEND_REQUEST,
      approveFriendRequest: vuexTypes.APPROVE_FRIEND_REQUEST,
      rejectFriendRequest: vuexTypes.REJECT_FRIEND_REQUEST,
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

    async addFriend (userId) {
      try {
        await this.sendFriendRequest(userId)
        Bus.success('profiles.request-sent-msg')
        await this.load()
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    async approveRequest (userId) {
      try {
        const request = this.friendsReceivedRequests
          .find(r => r.ownerId === userId)
        await this.approveFriendRequest(request.id)
        Bus.success('profiles.request-approved-msg')
        await this.load()
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    async rejectRequest (userId) {
      try {
        const request = this.friendsReceivedRequests
          .find(r => r.ownerId === userId)
        await this.rejectFriendRequest(request.id)
        Bus.success('profiles.request-rejected-msg')
        await this.load()
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    isFriend (userId) {
      return this.friends.map(f => f.userId).includes(userId)
    },

    isPendingRequest (userId) {
      return this.friendsSentRequests
        .map(r => r.participantId)
        .includes(userId)
    },

    needReview (userId) {
      return this.friendsReceivedRequests
        .map(r => r.ownerId)
        .includes(userId)
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

.profiles__card-actions {
  margin-top: 2.4rem;
  display: flex;
  justify-content: space-between;
}
</style>
