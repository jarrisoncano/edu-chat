import { routes } from '../../utils/routes'
import { Box, Flex, Text, useColorMode } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { usePathname, useRouter } from 'expo-router'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'

export const MenuBar = (): JSX.Element => {
	const router = useRouter()
	const pathname = usePathname()
	const { colorMode } = useColorMode()

	const color = colorMode === 'dark' ? 'white' : 'black'
	const bgColor = colorMode === 'dark' ? 'blueGray.900' : 'white'
	const bgColorActive = colorMode === 'dark' ? 'blueGray.800' : 'blueGray.100'

	const screens = [
		{
			name: 'Chats',
			icon: <Ionicons name='chatbubble-ellipses-outline' size={24} color='white' />,
			route: routes.home
		},
		{
			name: 'Events',
			icon: <MaterialIcons name='event' size={24} color='white' />,
			route: routes.events
		},
		{
			name: 'Settings',
			icon: <Feather name='settings' size={24} color='white' />,
			route: routes.settings
		}
	]

	return (
		<Box
			px='12'
			pb='5'
			pt='3'
			bg={bgColor}
			borderTopLeftRadius='3xl'
			borderTopRightRadius='3xl'
			flexDir='row'
			alignItems='center'
			justifyContent='space-between'
		>
			{screens.map((screen) => (
				<TouchableOpacity
					key={screen.route}
					onPress={() => {
						router.push(screen.route)
					}}
				>
					<Flex
						justifyContent='center'
						width='16'
						height='16'
						p='1'
						borderRadius='full'
						alignItems='center'
						bg={screen.route === pathname ? bgColorActive : bgColor}
					>
						<screen.icon.type
							{...screen.icon.props}
							color={screen.route === pathname ? '#818cf8' : color}
						/>
						<Text
							fontSize='xs'
							color={screen.route === pathname ? 'indigo.400' : color}
							fontWeight={screen.route === pathname ? 'bold' : 'normal'}
						>
							{screen.name}
						</Text>
					</Flex>
				</TouchableOpacity>
			))}
		</Box>
	)
}
