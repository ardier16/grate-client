<template>
  <div class="friends">
    <template v-if="isLoaded && friends.length">
      <div class="friends__cards">
        <div
          v-for="friend in friends"
          :key="friend.id"
          class="friends__card"
        >
          <user-avatar
            class="friends__card-avatar"
            :user="friend"
          />

          <h3
            class="friends__card-title"
            :title="friend.name || friend.login"
          >
            {{ friend.name || friend.login }}
          </h3>

          <p
            class="friends__card__username"
            :title="friend.login"
          >
            @{{ friend.login }}
          </p>

          <p
            class="friends__card-last-seen"
            :title="friend.lastSeen | formatCalendar"
          >
            <template v-if="isOnline(friend)">
              <span class="friends__card-online">
                {{ 'friends.online-msg' | globalize }}
              </span>
            </template>

            <template v-else>
              {{ 'friends.last-seen-msg' | globalize }}
              {{ friend.lastSeen | formatDate }}
            </template>
          </p>
        </div>
      </div>
    </template>

    <no-data-message
      v-else-if="isLoaded"
      icon-name="note-outline"
      :title="'friends.no-friends-title' | globalize"
      :message="'friends.no-friends-msg' | globalize"
    />

    <load-failed-message v-else-if="isLoadFailed" />

    <loader v-else />
  </div>
</template>

<script>
import moment from 'moment'

import Loader from '@/vue/common/loader.vue'
import NoDataMessage from '@/vue/common/no-data-message.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'
import UserAvatar from '@/vue/common/user-avatar.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'friends',
  components: {
    Loader,
    NoDataMessage,
    LoadFailedMessage,
    UserAvatar,
  },

  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
  }),

  computed: {
    ...mapGetters({
      friends: vuexTypes.friends,
      userId: vuexTypes.userId,
    }),
  },

  async created () {
    try {
      await this.loadFriends()
      this.isLoaded = true
    } catch (e) {
      this.isLoadFailed = true
    }
  },

  methods: {
    ...mapActions({
      loadFriends: vuexTypes.LOAD_FRIENDS,
    }),

    isOnline (friend) {
      return moment(friend.lastSeen).diff(moment.now(), 'minutes') >= -5
    },
  },
}
</script>

<style lang="scss">
@import '@scss/variables';
@import '@scss/mixins';

$friend-card-margin: 1rem;

$media-small-desktop: 960px;

.friends__cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -1rem;
}

@mixin friend-card-width ($width) {
  flex: 0 1 calc(#{$width} - (#{$friend-card-margin} * 2));
  max-width: calc(#{$width} - (#{$friend-card-margin} * 2));
}

.friends__card {
  margin: $friend-card-margin;
  background-color: $col-block-bg;
  padding: 2.4rem;
  border-radius: 0.5rem;
  min-height: 22rem;
  cursor: pointer;

  @include box-shadow();
  @include friend-card-width(33%);

  @include respond-to-custom($media-small-desktop) {
    @include friend-card-width(50%);
  }

  @include respond-to(small) {
    @include friend-card-width(100%);
  }
}

.friends__card-title {
  font-size: 2.4rem;
  text-align: center;
  margin-top: 2rem;
}

.friends__card__username {
  margin-top: 0.2rem;
  font-size: 1.6rem;
  color: $col-text-secondary;
  text-align: center;
}

.friends__card-last-seen {
  margin-top: 1.2rem;
  text-align: right;
  font-size: 1.2rem;
  color: $col-text-secondary;
}

.friends__card-online {
  font-size: 1.2rem;

  &:before {
    font-size: 1.4rem;
    content: '\2022';
    color: $col-success;
  }
}
</style>
