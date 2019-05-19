<template>
  <div class="friends">
    <template v-if="isLoaded && friends.length">
      <div class="friends__cards">
        <div
          v-for="friend in friends"
          :key="friend.id"
          class="friends__card"
        >
          <div class="friends__card-avatar">
            <img
              v-if="friend.avatarUrl"
              class="friends__card-avatar friends__card-avatar--image"
              :src="friend.avatarUrl"
            >

            <p
              v-else
              class="friends__card-avatar friends__card-avatar--abbr"
            >
              {{ friend.name | abbreviate }}
            </p>
          </div>

          <h3
            class="friends__card-title"
            :title="friend.name"
          >
            {{ friend.name }}
          </h3>

          <p
            class="friends__card-status"
            :title="friend.status"
          >
            {{ friend.status }}
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
import Loader from '@/vue/common/loader.vue'
import NoDataMessage from '@/vue/common/no-data-message.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'friends',
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
  min-height: 25rem;
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

.friends__card-avatar {
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

.friends__card-title {
  font-size: 2.4rem;
  text-align: center;
  margin-top: 2rem;
}

.friends__card-status {
  margin-top: 0.6rem;
  text-align: right;
  font-style: italic;
}
</style>
