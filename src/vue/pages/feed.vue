<template>
  <div class="feed">
    <div
      v-for="post in posts"
      :key="post._id"
      class="feed__card"
    >
      <h3 class="feed__card-title">
        {{ post.title }}
      </h3>

      <vue-markdown
        class="feed__card-text"
        :source="post.text"
      />
      <hr class="feed__card-line">

      <div class="feed__card-date">
        <p class="feed__card-created">
          {{ 'feed.created' | globalize }}
          {{ post.createdAt | formatDate }}
        </p>
        <p class="feed__card-updated">
          {{ 'feed.updated' | globalize }}
          {{ post.updatedAt | formatDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'feed',
  components: {
    VueMarkdown,
  },

  computed: {
    ...mapGetters({
      posts: vuexTypes.posts,
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
    }),
  },
}
</script>

<style lang="scss" scoped>
@import '@scss/variables';

.feed__card {
  background-color: $col-block-bg;
  margin-bottom: 2rem;
  padding: 2.4rem;
  border-radius: 0.5rem;
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
