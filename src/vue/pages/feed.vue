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
          <div class="feed__card-author">
            <div class="feed__card-author-avatar-wrp">
              <img
                v-if="post.author.avatarUrl"
                class="feed__card-author-avatar feed__card-author-avatar--image"
                :src="post.author.avatarUrl"
              >

              <p
                v-else
                class="feed__card-author-avatar feed__card-author-avatar--abbr"
              >
                {{ (post.author.name || post.author.login) | abbreviate }}
              </p>
            </div>

            <div class="feed__card-author-text">
              <span class="feed__card-author-name">
                {{ post.author.name || post.author.login }}
              </span>

              <span class="feed__card-author-username">
                @{{ post.author.login }}
              </span>
            </div>
          </div>

          <div
            v-if="post.author.id === userId"
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
@import '@scss/mixins';

.feed__card {
  background-color: $col-block-bg;
  padding: 2.4rem 4.8rem 4.8rem;
  border-radius: 0.5rem;
  position: relative;
  max-width: 120rem;
  margin: 0 auto 2rem;

  @include respond-to(small) {
    padding: 2.4rem;
  }
}

.feed__card-actions {
  position: absolute;
  right: 4.8rem;
  top: 2.4rem;

  @include respond-to(small) {
    right: 2.4rem;
  }
}

.feed__card-edit, .feed__card-delete {
  cursor: pointer;

  i {
    font-size: 2.4rem;
  }
}

.feed__card-author {
  display: flex;
}

.feed__card-author-text {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feed__card-author-name {
  font-size: 1.8rem;
  font-weight: 700;
}

.feed__card-author-username {
  font-size: 1.4rem;
  color: $col-text-secondary;
}

.feed__card-author-avatar {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;

  &--image {
    display: block;
  }

  &--abbr {
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $col-primary;
    color: $col-text-inverse;
  }
}

.feed__card-title {
  margin-top: 2rem;
  font-size: 3.2rem;
  text-align: center;
}

.feed__card-text {
  margin-top: 1.6rem;

  img {
    max-width: 100%;
    margin: 0.8rem 0;
  }

  h1 {
    font-size: 2.8rem;
    margin-bottom: 0.6rem;
    margin-top: 2rem;
  }

  h2 {
    font-size: 2.4rem;
    margin-bottom: 0.4rem;
    margin-top: 1.4rem;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 0.2rem;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
  }

  ul {
    list-style-type: disc !important;
    padding-left: 1.6rem;
  }

  li {
    list-style-type: disc !important;
    margin-bottom: 0.8rem;
  }

  a {
    color: $col-text-secondary;
  }
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
