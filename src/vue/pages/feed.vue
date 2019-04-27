<template>
  <div class="feed">
    <template v-if="selectedPost">
      <post-form
        :post="selectedPost"
        @submit="refreshPosts"
      />
    </template>

    <template v-else>
      <div
        v-for="post in posts"
        :key="post._id"
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
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import PostForm from '@/vue/forms/post-form'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'feed',
  components: {
    VueMarkdown,
    PostForm,
  },

  data: _ => ({
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
    } catch (e) {
      console.error(e)
      alert(e.message)
    }
  },

  methods: {
    ...mapActions({
      loadPosts: vuexTypes.LOAD_POSTS,
      deletePost: vuexTypes.DELETE_POST,
    }),

    async refreshPosts () {
      this.selectedPost = null

      try {
        await this.loadPosts()
      } catch (e) {
        console.error(e)
        alert(e.message)
      }
    },

    async removePost (post) {
      try {
        await this.deletePost(post._id)
        await this.refreshPosts()
        alert('Deleted')
      } catch (e) {
        console.error(e)
        alert(e.message)
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
