<template>
  <div class="profile-card">
    <user-avatar :user="profile" />

    <h3
      class="profile-card__title"
      :title="profile.name|| profile.login"
    >
      {{ profile.name || profile.login }}
    </h3>

    <p
      class="profile-card__username"
      :title="profile.login"
    >
      @{{ profile.login }}
    </p>

    <p
      class="profile-card__last-seen"
      :title="profile.lastSeen | formatCalendar"
    >
      <template v-if="isOnline(profile)">
        <span class="profile-card__online">
          {{ 'profiles.online-msg' | globalize }}
        </span>
      </template>

      <template v-else>
        {{ 'profiles.last-seen-msg' | globalize }}
        {{ profile.lastSeen | formatDate }}
      </template>
    </p>

    <div class="profile-card__actions">
      <template v-if="needReview(profile.id)">
        <button
          class="app__button-primary app__button-primary--success"
          @click="approveRequest(profile.id)"
        >
          {{ 'profiles.approve-btn' | globalize }}
        </button>

        <button
          class="app__button-primary app__button-primary--danger"
          @click="rejectRequest(profile.id)"
        >
          {{ 'profiles.reject-btn' | globalize }}
        </button>
      </template>

      <template v-else-if="profile.id !== userId">
        <button
          class="app__button-primary"
          @click="addFriend(profile.id)"
          :disabled="isFriend(profile.id) ||
            isPendingRequest(profile.id)"
        >
          <template v-if="isFriend(profile.id)">
            {{ 'profiles.friend-btn' | globalize }}
          </template>

          <template v-else-if="isPendingRequest(profile.id)">
            {{ 'profiles.requested-btn' | globalize }}
          </template>

          <template v-else>
            {{ 'profiles.add-friend-btn' | globalize }}
          </template>
        </button>
      </template>

      <template v-else>
        <button
          class="app__button-primary"
          :disabled="true"
        >
          {{ 'profiles.you-btn' | globalize }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import UserAvatar from '@/vue/common/user-avatar.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

const EVENTS = {
  updated: 'updated',
}

export default {
  name: 'profile-card',
  components: {
    UserAvatar,
  },

  props: {
    profile: { type: Object, required: true },
  },

  computed: {
    ...mapGetters({
      friends: vuexTypes.friends,
      friendsSentRequests: vuexTypes.friendsSentRequests,
      friendsReceivedRequests: vuexTypes.friendsReceivedRequests,
      userId: vuexTypes.userId,
    }),
  },

  methods: {
    ...mapActions({
      sendFriendRequest: vuexTypes.SEND_FRIEND_REQUEST,
      approveFriendRequest: vuexTypes.APPROVE_FRIEND_REQUEST,
      rejectFriendRequest: vuexTypes.REJECT_FRIEND_REQUEST,
    }),

    async addFriend (userId) {
      try {
        await this.sendFriendRequest(userId)
        Bus.success('profiles.request-sent-msg')
        await this.$emit(EVENTS.updated)
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
        await this.$emit(EVENTS.updated)
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
        await this.$emit(EVENTS.updated)
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    isFriend (userId) {
      return this.friends.map(f => f.id).includes(userId)
    },

    isOnline () {
      return moment(this.profile.lastSeen)
        .diff(moment.now(), 'minutes') >= -5
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

@mixin profile-card-width ($width) {
  flex: 0 1 calc(#{$width} - (#{$profile-card-margin} * 2));
  max-width: calc(#{$width} - (#{$profile-card-margin} * 2));
}

.profile-card {
  margin: $profile-card-margin;
  background-color: $col-block-bg;
  padding: 2.4rem;
  border-radius: 0.5rem;
  min-height: 30rem;
  cursor: pointer;
  position: relative;

  @include box-shadow();
  @include profile-card-width(33%);

  @include respond-to-custom($media-small-desktop) {
    @include profile-card-width(50%);
  }

  @include respond-to(small) {
    @include profile-card-width(100%);
  }
}

.profile-card__avatar {
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

.profile-card__title {
  font-size: 2.4rem;
  text-align: center;
  margin-top: 2rem;
}

.profile-card__username {
  margin-top: 0.2rem;
  font-size: 1.6rem;
  color: $col-text-secondary;
  text-align: center;
}

.profile-card__last-seen {
  margin-top: 1.2rem;
  text-align: right;
  font-size: 1.2rem;
  color: $col-text-secondary;
}

.profile-card__online {
  font-size: 1.2rem;

  &:before {
    font-size: 1.4rem;
    content: '\2022';
    color: $col-success;
  }
}

.profile-card__actions {
  position: absolute;
  width: calc(100% - 4.8rem);
  bottom: 2.4rem;
  display: flex;
  justify-content: space-between;
}
</style>
