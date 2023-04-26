import { store } from '../store'
import { Provider } from 'react-redux'
import { useUser } from '../hooks/useUser'
import { type User } from '../types/user'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { doc, getDoc } from 'firebase/firestore'
import { NativeBaseProvider } from 'native-base'
import { customTheme } from '../utils/customTheme'
import { COLLECTIONS } from '../utils/firebaseConsts'
import { auth, database } from '../config/firebaseConfig'
import { Slot, SplashScreen, useRouter } from 'expo-router'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routes } from '../utils/routes'
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

const queryClient = new QueryClient()

export default function App (): JSX.Element | null {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>

      <NativeBaseProvider theme={customTheme} >
        <RootLayout />
      </NativeBaseProvider>
      </QueryClientProvider>
    </Provider>
  )
}

function RootLayout (): JSX.Element {
  const { setUser } = useUser()
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const unSubscriber = onAuthStateChanged(auth, user => {
      if (user != null) {
        ;(async () => {
          const docRef = doc(database, COLLECTIONS.USERS, user.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const userData = docSnap.data() as User
            setUser(userData)
          } else signOut(auth).catch((e) => {})

          setShowSplashScreen(false)
        })().catch((e) => {})
      } else setShowSplashScreen(false)
    })
    return () => { unSubscriber() }
  }, [])

  return (

    <>
      <StatusBar style='light' />
      {
        showSplashScreen ? <SplashScreen /> : <RootLayoutNav />
      }
    </>
  )
}

function RootLayoutNav (): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    if (auth.currentUser != null) router.push(routes.chat)
    else router.push(routes.onboarding)
  }, [])

  return (
    <>
      <Slot />
    </>
  )
}
