<template>
  <div class="o-row  u-pt">
    <div class="o-container">
      <div class="o-layout  o-layout--small">
        <div v-for="post in posts" v-if="post.image" class="o-layout__item  u-width-1/3  c-card  u-mt">
          <nuxt-link :to="`/image/${post.ID}`">
            <div class="c-card__inner" :style="{'background-image': 'url(' + post.image + ')'}"></div>
          </nuxt-link>
        </div>
        
        <div v-if="!loaded" v-for="n in 9" class="o-layout__item  u-width-1/3  c-card  c-card--placeholder  u-mt">
            <div class="c-card__inner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postsCollection, usersCollection } from '@/plugins/firebase'

export default {
    data() {
        return {
            posts: [],
            loaded: false
        }
    },

    async mounted() {
        let userID = '';
        let user = await usersCollection.where('username', '==', this.$route.params.username).get()
        await user.forEach(e => {
            userID = e.data().id;
        });

        let posts = await postsCollection.where("user-id", "==", userID).get()
        await posts.forEach(post => {
            this.posts.push(post.data())
        });
        this.loaded = true
    }
}
</script>