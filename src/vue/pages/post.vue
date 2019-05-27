<template>
  <div class="posts">
    <template v-if="isLoaded">
      <template v-if="isEditMode">
        <post-form
          :post="selectedPost"
          @submit="refreshPost"
        />
      </template>

      <template v-else>
        <post-card
          :post="post"
          @edit-click="isEditMode = true"
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
import { mapActions } from 'vuex'

import { vueRoutes } from '@/vue-router/routes'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'post',
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
    isEditMode: false,
  }),

  async created () {
    try {
      await this.loadPost(this.$route.params.id)
      this.isLoaded = true
    } catch (e) {
      this.isLoadFailed = true
    }
  },

  methods: {
    ...mapActions({
      loadPost: vuexTypes.LOAD_POST,
      deletePost: vuexTypes.DELETE_POST,
    }),

    async refreshPost () {
      this.isEditMode = false
      this.isLoaded = false

      try {
        await this.loadPost()
        this.isLoaded = true
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    async removePost (post) {
      try {
        await this.deletePost(post.id)
        Bus.success('posts.post-removed-msg')
        await this.$router.push(vueRoutes.posts)
      } catch (e) {
        ErrorHandler.process(e)
      }
    },
  },
}
</script>
