<template>
  <div class="feed">
    <template v-if="isLoaded && feedPosts.length">
      <template v-if="selectedPost">
        <post-form
          :post="selectedPost"
          @submit="refreshPosts"
        />
      </template>

      <template v-else>
        <post-card
          v-for="post in feedPosts"
          :key="post.id"
          :post="post"
          @edit-click="selectPost"
          @remove-click="removePost"
        />
      </template>
    </template>

    <no-data-message
      v-else-if="isLoaded"
      icon-name="note-outline"
      :title="'feed.no-posts-title' | globalize"
      :message="'feed.no-posts-msg' | globalize"
    />

    <load-failed-message v-else-if="isLoadFailed" />

    <loader v-else />
  </div>
</template>

<script>
import Loader from '@/vue/common/loader.vue'
import NoDataMessage from '@/vue/common/no-data-message.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'
import PostCard from '@/vue/common/post-card.vue'

import PostForm from '@/vue/forms/post-form.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'feed',
  components: {
    Loader,
    NoDataMessage,
    LoadFailedMessage,
    PostForm,
    PostCard,
  },

  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
    selectedPost: null,
  }),

  computed: {
    ...mapGetters({
      feedPosts: vuexTypes.feedPosts,
      userId: vuexTypes.userId,
    }),
  },

  async created () {
    try {
      await this.loadFeed()
      this.isLoaded = true
    } catch (e) {
      this.isLoadFailed = true
    }
  },

  methods: {
    ...mapActions({
      loadFeed: vuexTypes.LOAD_FEED,
      deletePost: vuexTypes.DELETE_POST,
    }),

    selectPost (post) {
      this.selectedPost = post
    },

    async refreshPosts () {
      this.selectedPost = null
      this.isLoaded = false

      try {
        await this.loadFeed()
        this.isLoaded = true
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    async removePost (post) {
      try {
        await this.deletePost(post.id)
        await this.refreshPosts()
        Bus.success('feed.post-removed-msg')
      } catch (e) {
        ErrorHandler.process(e)
      }
    },
  },
}
</script>
