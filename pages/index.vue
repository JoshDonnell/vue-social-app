<template>
  <div class="o-row  u-pt">
    <div class="o-container">
      <div class="o-layout  o-layout--small">
        <div v-for="post in posts" class="o-layout__item  u-width-1/3  c-card  u-mt">
          <nuxt-link :to="`/image/${post.ID}`">
            <div class="c-card__inner" :style="{'background-image': 'url(' + post.image + ')'}"></div>
          </nuxt-link>
        </div>
        
        <div v-if="!posts.length" v-for="n in 9" class="o-layout__item  u-width-1/3  c-card  c-card--placeholder  u-mt">
          <div class="c-card__inner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
     posts() {
      return this.$store.state.posts.posts
    }
  },

  mounted() {
    this.$store.dispatch('posts/fetchPosts')
  }
}
</script>
