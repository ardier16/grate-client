<template>
  <div class="comment-card">
    <comment-form
      class="comment-card__form"
      v-if="isEditMode"
      :comment="comment"
      :post-id="postId"
      @submit="emitUpdate"
    />

    <div
      v-else
      class="comment-card__content"
    >
      <div class="comment-card__author">
        <div class="comment-card__author-avatar-wrp">
          <img
            v-if="comment.author.avatarUrl"
            class="comment-card__author-avatar
                    comment-card__author-avatar--image"
            :src="comment.author.avatarUrl"
          >

          <p
            v-else
            class="comment-card__author-avatar
                    comment-card__author-avatar--abbr"
          >
            {{ (comment.author.name || comment.author.login) | abbreviate }}
          </p>
        </div>

        <div class="comment-card__author-text">
          <span class="comment-card__author-name">
            {{ comment.author.name || comment.author.login }}
          </span>

          <span class="comment-card__author-username">
            @{{ comment.author.login }}
          </span>
        </div>
      </div>

      <div
        v-if="comment.author.id === userId"
        class="comment-card__actions"
      >
        <a
          @click="isEditMode = true"
          class="comment-card__edit"
        >
          <i class="mdi mdi-pencil" />
        </a>
        <a
          @click="removeComment"
          class="comment-card__delete"
        >
          <i class="mdi mdi-close" />
        </a>
      </div>

      <vue-markdown
        class="comment-card__text"
        :source="comment.text"
      />
      <hr class="comment-card__line">

      <div class="comment-card__date">
        <p
          class="comment-card__created"
          :title="comment.createdAt | formatCalendar"
        >
          {{ 'comments.created' | globalize }}
          {{ comment.createdAt | formatDate }}
        </p>

        <p
          class="comment-card__updated"
          :title="comment.updatedAt | formatCalendar"
        >
          {{ 'comments.updated' | globalize }}
          {{ comment.updatedAt | formatDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

import CommentForm from '@/vue/forms/comment-form.vue'

import { vuexTypes } from '@/vuex'
import { mapActions, mapGetters } from 'vuex'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'
import { vueRoutes } from '@/vue-router/routes'

const EVENTS = {
  updated: 'updated',
}

export default {
  name: 'comment-card',
  components: {
    VueMarkdown,
    CommentForm,
  },

  props: {
    comment: { type: Object, required: true },
    postId: { type: String, required: true },
  },

  data: _ => ({
    isEditMode: false,
    EVENTS,
    vueRoutes,
  }),

  computed: {
    ...mapGetters({
      userId: vuexTypes.userId,
    }),
  },

  methods: {
    ...mapActions({
      deleteComment: vuexTypes.DELETE_COMMENT,
    }),

    emitUpdate () {
      this.isEditMode = false
      this.$emit(EVENTS.updated)
    },

    async removeComment () {
      try {
        await this.deleteComment(this.comment.id)
        await this.emitUpdate()
        Bus.success('comments.comment-removed-msg')
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

.comment-card__form {
  margin-bottom: 2rem;
}

.comment-card__content {
  background-color: $col-block-bg;
  padding: 2.4rem 4.8rem 2.4rem;
  border-radius: 0.5rem;
  position: relative;
  max-width: 120rem;
  margin: 0 auto 2rem;

  @include box-shadow();

  @include respond-to(small) {
    padding: 2.4rem;
  }
}

.comment-card__actions {
  position: absolute;
  right: 4.8rem;
  top: 2.4rem;

  @include respond-to(small) {
    right: 2.4rem;
  }
}

.comment-card__edit, .comment-card__delete {
  cursor: pointer;

  i {
    font-size: 2.4rem;
  }
}

.comment-card__author {
  display: flex;
}

.comment-card__author-text {
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment-card__author-name {
  font-size: 1.8rem;
  font-weight: 700;
}

.comment-card__author-username {
  font-size: 1.4rem;
  color: $col-text-secondary;
}

.comment-card__author-avatar {
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

.comment-card__text {
  margin-top: 1.2rem;

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

.comment-card__line {
  margin-top: 1.6rem;
}

.comment-card__date {
  margin-top: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
