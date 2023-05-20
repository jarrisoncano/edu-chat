import { signOut } from 'firebase/auth'
import { type User } from '../types/user'
import { useAppDispatch } from '../store'
import { auth } from '../config/firebaseConfig'
import { handleLogout, handleSetUser } from '../store/user/userSlice'
import { useRouter } from 'expo-router'
import { routes } from '../utils/routes'

export const useUser = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const setUser = (user: User) => {
		dispatch(handleSetUser(user))
	}

	const logout = () => {
		dispatch(handleLogout())
		signOut(auth)
		router.push(routes.onboarding)
	}

	return {
		setUser,
		logout
	}
}
