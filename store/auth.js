import { fb, auth, usersCollection, postsCollection } from '@/plugins/firebase'
import 'firebase/auth'

export const state = () => ({
    errors: '',
    userProfile: {},
    posts: []
})


export const mutations = {
    clearErorrs(state) {
        state.errors = ''
    },

    addErrors(state, errors) {
        state.errors = errors.message
    },

    setUser(state, user) {
        state.userProfile = JSON.parse(JSON.stringify(user))
    },

    setPosts(state, posts) {
        if (state.posts.length) return
        posts.forEach(post => {
            state.posts.push(post.data())
        });
    }
}


export const actions = {
    async login({ dispatch, commit }, { email, password }) {
        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password)
            this.app.router.push('/')
        } 
        catch(err) {
            commit('clearErrors')
            commit('addErrors', err)
        }
    },

    async register({ dispatch, commit }, { email, name, username, password }) {
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            usersCollection.doc(user.uid).set({
                name: name,
                username: username,
                id: user.uid
            })
            user.updateProfile({
                displayName: username
            })
            // dispatch('login', email, password)
            this.app.router.push('/')
        } 
        catch(err) {
            commit('clearErrors')
            commit('addErrors', err)
        }
    },

    logout({ commit }) {
        auth.signOut()
        commit('setUser', null)
        this.app.router.push('/')
    },

    fetchPosts({ commit, state }) {
         auth.onAuthStateChanged(async function(user) {
            let posts = await postsCollection.where('user-id', "==", state.userProfile.uid).get()
            commit('setPosts', posts)
        })
    }
}