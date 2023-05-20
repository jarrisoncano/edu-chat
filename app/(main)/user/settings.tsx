import { useAppSelector } from '../../../store'
import { TouchableOpacity } from 'react-native'
import { useUser } from '../../../hooks/useUser'
import { Box, Divider, HStack, Text, VStack, View } from 'native-base'
import { CustomAvatar } from '../../../components/shared/CustomAvatar'

export default function Settings() {
	const { logout } = useUser()
	const user = useAppSelector((state) => state.userSlice.user)

	return (
		<View>
			<HStack mt='3' space={5} alignItems='center'>
				<CustomAvatar imageURI={user?.avatar} size='lg' />
				<VStack>
					<Text fontSize='xl' fontWeight='semibold'>
						{user?.name}
					</Text>
					<Text fontSize='sm'>{user?.email}</Text>
				</VStack>
			</HStack>
			<Divider my='3' mt='6' bg='blueGray.700' />
			<Box>
				<TouchableOpacity>
					<Text>Settings</Text>
				</TouchableOpacity>
				<Divider my='3' bg='blueGray.700' />
				<TouchableOpacity onPress={logout}>
					<Text color='red.500' bold>
						Log out
					</Text>
				</TouchableOpacity>
				<Divider my='3' bg='blueGray.700' />
			</Box>
		</View>
	)
}
