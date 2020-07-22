import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: env.APP_API_KEY,
    authDomain: env.APP_AUTH_DOMAIN,
    databaseURL: env.APP_DB_URL,
    projectId: env.APP_PROJECT_ID,
    storageBucket: env.APP_STORAGE_BUCKET,
    messagingSenderId: env.APP_MESSAGING_SENDER_ID,
    appId: env.APP_ID,
};

let app = null

if(!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const db = firebase.firestore()


// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}