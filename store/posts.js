import { postsCollection } from '@/plugins/firebase'


export const state = () => ({
    posts: []
})


export const mutations = {
    setPosts(state, posts) {
        if (state.posts.length) return
        posts.forEach(post => {
            state.posts.push(post.data())
        });
    }
}


export const actions = {
    async fetchPosts({ commit }) {
        let posts = await postsCollection.get()
        commit('setPosts', posts)
    }
}


export const getters = {

}