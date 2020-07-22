<template>
  <div>
      <img :src="post.image" alt="">
      <span v-for="comment in comments" :key="comment.ID">{{ comment.comment }}</span>
      <div>You have {{likes}} like</div>
      <nuxt-link v-if="user" :to="'/profile/' + user.username">{{ user.username }}</nuxt-link>
  </div>
</template>

<script>
import { postsCollection, commentsCollection, likesCollection, usersCollection } from '@/plugins/firebase'

export default {
    data() {
        return {
            post: {},
            comments: [],
            likes: 0,
            user: {}
        }
    },

    async mounted() {
        await postsCollection.doc(this.$route.params.id).get().then((post) => { 
            this.post = post.data()
        })

        await commentsCollection.where("post-id", "==", this.$route.params.id).get().then((comments) => { 
            comments.forEach(comment => {
               this.comments.push(comment.data()) 
            });
        })

        await likesCollection.where("post-id", "==", this.$route.params.id).get().then((likes) => { 
            this.likes = likes.size
        })

        if (this.post['user-id']) {
            let users = await usersCollection.where("id", "==", this.post['user-id']).get()
            await users.forEach(user => {
                this.user = user.data()
            });
        }

    },
}
</script>

<style>

</style>