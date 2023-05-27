import { store, useAppSelector } from '../store'
import { Provider } from 'react-redux'
import { routes } from '../utils/routes'
import { type User } from '../types/user'
import { useUser } from '../hooks/useUser'
import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { NativeBaseProvider, useColorMode } from 'native-base'
import { customTheme } from '../utils/customTheme'
import { COLLECTIONS } from '../utils/firebaseConsts'
import { auth, database } from '../config/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from 'expo-router'

export const queryClient = new QueryClient()

export default function App(): JSX.Element | null {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<NativeBaseProvider theme={customTheme}>
					<RootLayout />
				</NativeBaseProvider>
			</QueryClientProvider>
		</Provider>
	)
}

function RootLayout(): JSX.Element {
	const { setUser } = useUser()
	const { colorMode } = useColorMode()
	const [showSplashScreen, setShowSplashScreen] = useState(true)

	useEffect(() => {
		const unSubscriber = onAuthStateChanged(auth, (user) => {
			if (user != null) {
				;(async () => {
					const docRef = doc(database, COLLECTIONS.USERS, user.uid)
					const docSnap = await getDoc(docRef)

					if (docSnap.exists()) {
						const userData = docSnap.data() as User
						setUser(userData)
					} else {
						const newUser: User = {
							uid: user.uid as string,
							name: user.displayName as string,
							email: user.email as string,
							avatar: user.photoURL as string,
							description: ''
						}
						await setDoc(doc(database, COLLECTIONS.USERS, user.uid), newUser)
						setUser(newUser)
					}

					setShowSplashScreen(false)
				})().catch((e) => {})
			} else setShowSplashScreen(false)
		})
		return () => {
			unSubscriber()
		}
	}, [])

	return (
		<>
			<StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} />
			{showSplashScreen ? <SplashScreen /> : <RootLayoutNav />}
		</>
	)
}

function RootLayoutNav(): JSX.Element {
	const router = useRouter()
	const segments = useSegments()
	const user = useAppSelector((state) => state.userSlice.user)

	useEffect(() => {
		if (segments[0] !== '(auth)' && user === null) router.push(routes.onboarding)
		else if (segments[0] !== '(main)' && user) router.push(routes.home)
	}, [user, segments])

	return (
		<>
			<Slot />
		</>
	)
}
