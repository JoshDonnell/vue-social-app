import { auth } from '@/plugins/firebase'

export default function ({store, router}) {
    auth.onAuthStateChanged((user) => {
        store.commit('auth/setUser', user)
    })
}
  