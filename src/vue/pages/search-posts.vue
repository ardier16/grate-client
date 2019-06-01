<template>
  <div class="search-posts">
    <input-field
      v-model="query"
      label=""
      placeholder="Type your search query here"
      :white-autofill="false"
    />

    <div class="search-posts__content">
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
        :title="'search.no-posts-title' | globalize"
        :message="'search.no-posts-msg' | globalize"
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
import PostCard from '@/vue/common/post-card.vue'

import PostForm from '@/vue/forms/post-form.vue'

import { api } from '@/api'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

const SEARCH_POSTS_DELAY = 1000

export default {
  name: 'search-posts',
  components: {
    InputField,
    Loader,
    NoDataMessage,
    LoadFailedMessage,
    PostForm,
    PostCard,
  },

  data: _ => ({
    query: '',
    posts: [],
    isLoaded: true,
    isLoadFailed: false,
    selectedPost: null,
    postsDebouncedFunc: null,
  }),

  watch: {
    query () {
      this.refreshPosts()
    },
  },

  methods: {
    ...mapActions({
      deletePost: vuexTypes.DELETE_POST,
    }),

    async loadPosts () {
      try {
        this.posts = await api().get({
          endpoint: '/posts/search',
          query: { q: this.query },
        })
        this.isLoaded = true
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    async refreshPosts () {
      this.selectedPost = null
      this.isLoaded = false

      if (!this.postsDebouncedFunc) {
        this.postsDebouncedFunc = _debounce(
          () => this.loadPosts(),
          SEARCH_POSTS_DELAY
        )
      }
      return this.postsDebouncedFunc()
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

<style lang="scss" scoped>
.search-posts__content {
  margin-top: 4rem;
}
</style>
