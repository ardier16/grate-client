<template>
  <div class="feed">
    <div
      v-for="post in posts"
      :key="post._id"
    >
      <p>{{ post.title }}</p>
      <vue-markdown :source="post.text" />
      <p>Created: {{ post.createdAt | formatDate }}</p>
      <p>Updated: {{ post.updatedAt | formatDate }}</p>
      <hr>
      <br>
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
