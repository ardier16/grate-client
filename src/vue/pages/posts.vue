<template>
  <div class="posts">
    <template v-if="isLoaded && posts.length">
      <template v-if="selectedPost">
        <post-form
          :post="selectedPost"
          @submit="refreshPosts"
        />
      </template>

      <template v-else>
        <post-card
          v-for="post in posts"
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
      :title="'posts.no-posts-title' | globalize"
      :message="'posts.no-posts-msg' | globalize"
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
  name: 'posts',
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
      posts: vuexTypes.posts,
    }),
  },

  async created () {
    try {
      await this.loadPosts()
      this.isLoaded = true
    } catch (e) {
      this.isLoadFailed = true
    }
  },

  methods: {
    ...mapActions({
      loadPosts: vuexTypes.LOAD_POSTS,
      deletePost: vuexTypes.DELETE_POST,
    }),

    async refreshPosts () {
      this.selectedPost = null
      this.isLoaded = false

      try {
        await this.loadPosts()
        this.isLoaded = true
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    selectPost (post) {
      this.selectedPost = post
    },

    async removePost (post) {
      try {
        await this.deletePost(post.id)
        await this.refreshPosts()
        Bus.success('posts.post-removed-msg')
      } catch (e) {
        ErrorHandler.process(e)
      }
    },
  },
}
</script>
