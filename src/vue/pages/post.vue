<template>
  <div class="post">
    <template v-if="isLoaded">
      <template v-if="isEditMode">
        <post-form
          :post="post"
          @submit="refreshPost"
        />
      </template>

      <template v-else>
        <post-card
          :post="post"
          @edit-click="isEditMode = true"
          @remove-click="removePost"
        />

        <modal :is-shown.sync="isModalShown">
          <rate-post-form
            :post="post"
            :factors="factors"
            @submit="closeModal() || refreshPost()"
          />
        </modal>

        <div
          v-if="post.rates"
          class="post__rates"
        >
          <div class="post__rates-heading">
            <h3 class="post__rates-title">
              {{
                `Rates (${post.rates.length})`
              }}
            </h3>

            <button
              class="app__button-primary"
              @click="isModalShown = true"
            >
              Rate post
            </button>
          </div>

          <div class="post__rates-wrp">
            <div
              v-for="rate in formattedRates"
              :key="rate.code"
              class="post__rate"
            >
              <h4 class="post__rate-factor">
                {{ `factor-types.${rate.code}` | globalize }}
                {{ `(${rate.count})` }}
              </h4>
              <p class="post__rate-count">
                <rate-renderer :rate="rate.average" />
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="post.comments"
          class="post__comments"
        >
          <h3 class="post__comments-title">
            {{
              'posts.comments-title' | globalize({
                count: post.comments.length
              })
            }}
          </h3>

          <comment-form
            class="post__comment-form"
            :post-id="post.id"
            @submit="refreshPost"
          />

          <comment-card
            v-for="comment in post.comments"
            :key="comment.id"
            :comment="comment"
            :post-id="post.id"
            @updated="refreshPost"
          />
        </div>
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
import _meanBy from 'lodash/meanBy'

import Loader from '@/vue/common/loader.vue'
import Modal from '@/vue/common/modal.vue'
import RateRenderer from '@/vue/common/rate-renderer.vue'
import NoDataMessage from '@/vue/common/no-data-message.vue'
import LoadFailedMessage from '@/vue/common/load-failed-message.vue'
import PostCard from '@/vue/common/post-card.vue'
import CommentCard from '@/vue/common/comment-card.vue'

import PostForm from '@/vue/forms/post-form.vue'
import RatePostForm from '@/vue/forms/rate-post-form.vue'
import CommentForm from '@/vue/forms/comment-form.vue'

import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

import { vueRoutes } from '@/vue-router/routes'

import { api } from '@/api'
import { ErrorHandler } from '@/js/helpers/error-handler'
import { Bus } from '@/js/helpers/event-bus'

export default {
  name: 'post',
  components: {
    Loader,
    Modal,
    RateRenderer,
    NoDataMessage,
    LoadFailedMessage,
    PostForm,
    CommentForm,
    RatePostForm,
    PostCard,
    CommentCard,
  },

  data: _ => ({
    isModalShown: false,
    factors: [],
    post: null,
    isLoaded: false,
    isLoadFailed: false,
    isEditMode: false,
  }),

  computed: {
    formattedRates () {
      return this.factors.map(factor => {
        const factorRates = this.post.rates
          .filter(rate => rate.factorId === factor.id)

        return {
          code: factor.code,
          average: _meanBy(factorRates, item => item.value) || 0,
          count: factorRates.length,
        }
      })
    },
  },

  async created () {
    try {
      this.post = await this.loadPost(this.$route.params.id)
      this.factors = await this.getFactors()
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

    closeModal () {
      this.isModalShown = false
    },

    async getFactors () {
      const factors = api().get({
        endpoint: '/factors',
        query: {
          locale: 'en',
          type: 2,
        },
      })

      return factors
    },

    async refreshPost () {
      this.isEditMode = false
      this.isLoaded = false

      try {
        this.post = await this.loadPost(this.post.id)
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

<style lang="scss" scoped>
@import '@scss/variables';
@import '@scss/mixins';

.post__comments, .post__rates {
  max-width: 120rem;
  margin: 4rem auto 2rem;
}

.post__comment-form {
  margin-bottom: 2rem;

  @include box-shadow();
}

.post__comments-title {
  margin-bottom: 2rem;
  font-size: 2.4rem;
}

.post__rates-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.post__rates-title {
  font-size: 2.4rem;
}

.post__rates-wrp {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: $col-block-bg;
  padding: 2.4rem 1.4rem;
  border-radius: 1rem;

  @include box-shadow();
}

.post__rate {
  margin: 0 1rem;
}

.post__rate-factor {
  font-size: 1.8rem;
}
</style>
