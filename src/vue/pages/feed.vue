<template>
  <div class="feed">
    <template v-if="isLoaded && posts.length">
      <template v-if="selectedPost">
        <post-form
          :post="selectedPost"
          @submit="refreshPosts"
        />
      </template>

      <template v-else>
        <div
          v-for="post in posts"
          :key="post.id"
          class="feed__card"
        >
          <div
            v-if="post.ownerId === userId"
            class="feed__card-actions"
          >
            <a
              @click="selectedPost = post"
              class="feed__card-edit"
            >
              <i class="mdi mdi-pencil" />
            </a>
            <a
              @click="removePost(post)"
              class="feed__card-delete"
            >
              <i class="mdi mdi-close" />
            </a>
          </div>

          <h3 class="feed__card-title">
            {{ post.title }}
          </h3>

          <vue-markdown
            class="feed__card-text"
            :source="post.text"
          />
          <hr class="feed__card-line">

          <div class="feed__card-date">
            <p
              class="feed__card-created"
              :title="post.createdAt | formatCalendar"
            >
              {{ 'feed.created' | globalize }}
              {{ post.createdAt | formatDate }}
            </p>

            <p
              class="feed__card-updated"
              :title="post.updatedAt | formatCalendar"
            >
              {{ 'feed.updated' | globalize }}
              {{ post.updatedAt | formatDate }}
            </p>
          </div>
        </div>
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
import VueMarkdown from 'vue-markdown'

import Loader from '@/vue/common/loader.vue'
import NoDataMessage from '@/vue/common/no-data-message.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'

import PostForm from '@/vue/forms/post-form.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'feed',
  components: {
    VueMarkdown,
    Loader,
    NoDataMessage,
    LoadFailedMessage,
    PostForm,
  },

  data: _ => ({
    isLoaded: false,
    isLoadFailed: false,
    selectedPost: null,
  }),

  computed: {
    ...mapGetters({
      posts: vuexTypes.posts,
      userId: vuexTypes.userId,
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

<style lang="scss">
@import '@scss/variables';

.feed__card {
  background-color: $col-block-bg;
  margin-bottom: 2rem;
  padding: 2.4rem;
  border-radius: 0.5rem;
  position: relative;
}

.feed__card-actions {
  position: absolute;
  right: 2rem;
}

.feed__card-edit, .feed__card-delete {
  cursor: pointer;

  i {
    font-size: 2rem;
  }
}

.feed__card-title {
  font-size: 3.2rem;
  text-align: center;
}

.feed__card-text {
  margin-top: 1.6rem;
}

.feed__card-line {
  margin-top: 1.6rem;
}

.feed__card-date {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
}
</style>
