import Constants from 'expo-constants'
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

if (Constants.manifest?.extra == null) {
  throw new Error('No firebase config found')
}

const firebaseConfig = {
  apiKey: Constants.manifest?.extra.apiKey,
  authDomain: Constants.manifest?.extra.authDomain,
  projectId: Constants.manifest?.extra.projectId,
  storageBucket: Constants.manifest?.extra.storageBucket,
  messagingSenderId: Constants.manifest?.extra.messagingSenderId,
  appId: Constants.manifest?.extra.appId,
  databaseURL: Constants.manifest?.extra.databaseURL
}

initializeApp(firebaseConfig)
export const auth = getAuth()
export const database = getFirestore()
