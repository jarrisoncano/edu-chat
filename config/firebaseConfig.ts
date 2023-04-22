import Constants from 'expo-constants'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getReactNativePersistence, initializeAuth } from 'firebase/auth/react-native'

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

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const database = getFirestore()
