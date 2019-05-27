<template>
  <div class="post-card">
    <div class="post-card__author">
      <div class="post-card__author-avatar-wrp">
        <img
          v-if="post.author.avatarUrl"
          class="post-card__author-avatar
                  post-card__author-avatar--image"
          :src="post.author.avatarUrl"
        >

        <p
          v-else
          class="post-card__author-avatar
                  post-card__author-avatar--abbr"
        >
          {{ (post.author.name || post.author.login) | abbreviate }}
        </p>
      </div>

      <div class="post-card__author-text">
        <span class="post-card__author-name">
          {{ post.author.name || post.author.login }}
        </span>

        <span class="post-card__author-username">
          @{{ post.author.login }}
        </span>
      </div>
    </div>

    <div
      v-if="post.author.id === userId"
      class="post-card__actions"
    >
      <a
        @click="$emit(EVENTS.editClick, post)"
        class="post-card__edit"
      >
        <i class="mdi mdi-pencil" />
      </a>
      <a
        @click="$emit(EVENTS.removeClick, post)"
        class="post-card__delete"
      >
        <i class="mdi mdi-close" />
      </a>
    </div>

    <router-link
      class="post-card__title"
      :to="{ ...vueRoutes.post, params: { id: post.id } }"
    >
      {{ post.title }}
    </router-link>

    <vue-markdown
      class="post-card__text"
      :source="post.text"
    />
    <hr class="post-card__line">

    <div class="post-card__date">
      <p
        class="post-card__created"
        :title="post.createdAt | formatCalendar"
      >
        {{ 'posts.created' | globalize }}
        {{ post.createdAt | formatDate }}
      </p>

      <p
        v-if="post.commentsCount > 0"
        class="post-card__comments-wrp"
      >
        <i class="mdi mdi-comment-text-outline post-card__comments-icon" />
        <span class="post-card__comments">
          {{ post.commentsCount }}
        </span>
      </p>

      <p
        class="post-card__updated"
        :title="post.updatedAt | formatCalendar"
      >
        {{ 'posts.updated' | globalize }}
        {{ post.updatedAt | formatDate }}
      </p>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

import { vuexTypes } from '@/vuex'
import { mapGetters } from 'vuex'

import { vueRoutes } from '@/vue-router/routes'

const EVENTS = {
  editClick: 'edit-click',
  removeClick: 'remove-click',
}

export default {
  name: 'post-card',
  components: { VueMarkdown },

  props: {
    post: { type: Object, required: true },
  },

  data: _ => ({
    EVENTS,
    vueRoutes,
  }),

  computed: {
    ...mapGetters({
      userId: vuexTypes.userId,
    }),
  },
}
</script>

<style lang="scss">
@import '@scss/variables';
@import '@scss/mixins';

.post-card {
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

.post-card__actions {
  position: absolute;
  right: 4.8rem;
  top: 2.4rem;

  @include respond-to(small) {
    right: 2.4rem;
  }
}

.post-card__edit, .post-card__delete {
  cursor: pointer;

  i {
    font-size: 2.4rem;
  }
}

.post-card__author {
  display: flex;
}

.post-card__author-text {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-card__author-name {
  font-size: 1.8rem;
  font-weight: 700;
}

.post-card__author-username {
  font-size: 1.4rem;
  color: $col-text-secondary;
}

.post-card__author-avatar {
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

.post-card__title {
  margin-top: 0.4rem;
  font-size: 3.2rem;
  display: flex;
  justify-content: center;
  color: $col-primary;
  text-decoration: none;
}

.post-card__text {
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

.post-card__line {
  margin-top: 1.6rem;
}

.post-card__date {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-card__comments-wrp {
  display: flex;
  align-items: center;
}

.post-card__comments-icon {
  font-size: 1.8rem;
}

.post-card__comments {
  font-size: 1.6rem;
  margin-left: 0.4rem;
}
</style>
