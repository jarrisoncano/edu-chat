import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { routes } from '../../utils/routes'
import * as WebBrowser from 'expo-web-browser'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Box, Divider, Text } from 'native-base'
import { auth } from '../../config/firebaseConfig'
import { makeRedirectUri } from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth'

WebBrowser.maybeCompleteAuthSession()

export const LoginWith = (): JSX.Element => {
	const router = useRouter()
	const [_, response, promptAsync] = Google.useAuthRequest({
		iosClientId: '878570262966-2m488ku61cvnb10tlpbddrj49n6aia56.apps.googleusercontent.com',
		expoClientId: '878570262966-k4jkab5lfd0gk2qlkictpm1ih4huhkrk.apps.googleusercontent.com'
	})

	const handlePress = async () => {
		promptAsync()
	}

	const getUserInfo = async ({ accessToken }: { accessToken: string }) => {
		if (!accessToken) return

		try {
			const credential = GoogleAuthProvider.credential(null, accessToken)
			await signInWithCredential(auth, credential)

			router.push(routes.home)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		if (response?.type === 'success') {
			if (response?.authentication?.accessToken) {
				getUserInfo({
					accessToken: response?.authentication.accessToken
				})
			}
		}
	}, [response])

	return (
		<>
			<Box mt='16' alignItems='center' justifyContent='center' flexDirection='row'>
				<Divider width='1/5' />
				<Text color='blueGray.400' fontSize='sm' mx='2'>
					Or Login with
				</Text>
				<Divider width='1/5' />
			</Box>
			<TouchableOpacity onPress={handlePress}>
				<Box
					py='2'
					borderRadius='sm'
					mt='12'
					alignItems='center'
					justifyContent='center'
					display='flex'
					flexDirection='row'
					background='white'
				>
					<AntDesign name='google' size={20} color='black' />
					<Text ml='2' color='black' flexDirection='row' alignItems='center'>
						Google
					</Text>
				</Box>
			</TouchableOpacity>
		</>
	)
}
