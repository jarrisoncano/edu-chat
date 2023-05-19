import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { routes } from '../../../utils/routes'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../../store'
import { Box, Fab, Icon, View } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { UserCard } from '../../../components/Chats/UserCard'
import { CustomInput } from '../../../components/shared/CustomInput'

export default function Home(): JSX.Element {
	const router = useRouter()
	const { control } = useForm()
	const groups = useAppSelector((state) => state.groupsSlice.groups)

	return (
		<View>
			<Box h='10' flexDir='row' justifyContent='space-between'>
				<Box width='5/6'>
					<CustomInput height='10' label='' name='find' control={control} placeholder='Search...' />
				</Box>
				<TouchableOpacity onPress={() => router.push(routes.contacts)}>
					<Box justifyContent='center' alignItems='center' width='10' h='full'>
						<MaterialIcons name='contacts' size={27} color='white' />
					</Box>
				</TouchableOpacity>
			</Box>
			<Box mt='10'>
				{groups.map((group) => {
					const messagesUnread = group.chat.filter(
						(message) => message.status?.read.includes(group.id) === false
					)
					const lastMessage: any = group.chat[group.chat.length - 1] || {
						content: 'Write the first message',
						createdAt: group.createdAt
					}
					if (lastMessage?.createdAt?.toDate) lastMessage.createdAt = lastMessage.createdAt.toDate()
					// Write the first message lorem ipsum lorem sds ifsdmsf fsdf essage lorem ipsum essage lorem ipsum
					return (
						<UserCard
							key={group.id}
							id={group.id}
							username={group.name}
							avatar={group.avatar}
							unread={messagesUnread.length}
							message={lastMessage.content}
							date={lastMessage.createdAt}
						/>
					)
				})}
			</Box>
			<CreateGroupButton />
		</View>
	)
}

const CreateGroupButton = () => {
	const router = useRouter()

	return (
		<Fab
			renderInPortal={false}
			shadow={2}
			width='12'
			onPress={() => {
				router.push(routes.createGroup)
			}}
			height='12'
			icon={<Icon color='white' as={AntDesign} name='plus' size='sm' />}
		/>
	)
}
