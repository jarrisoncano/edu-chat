import { useRouter } from 'expo-router'
import { routes } from '../../../utils/routes'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../../store'
import { MaterialIcons } from '@expo/vector-icons'
import { type Message } from '../../../types/Group'
import { Box, Fab, Icon, Text, View } from 'native-base'
import { UserCard } from '../../../components/Chats/UserCard'

export default function Home(): JSX.Element {
	const router = useRouter()
	const user = useAppSelector((state) => state.userSlice.user)
	const groups = useAppSelector((state) => state.groupsSlice.groups)

	return (
		<View>
			<Box mt='2' flexDir='row' justifyContent='space-between' alignItems='center'>
				<Text numberOfLines={1} width='5/6' fontSize='lg' fontWeight='light'>
					Hello, <Text bold>{user?.name} ✨</Text>
				</Text>
				<Box alignItems='flex-end' width='1/6'>
					<TouchableOpacity onPress={() => router.push(routes.contacts)}>
						<MaterialIcons name='contacts' size={22} color='white' />
					</TouchableOpacity>
				</Box>
			</Box>
			<Box mt='7'>
				{groups.map((group) => {
					const messagesUnread = group.chat.filter(
						(message) => message.status?.read.includes(user?.uid ?? '') === false
					)
					const lastMessage: Message = group.chat[group.chat.length - 1] || {
						content: 'Write the first message',
						createdAt: group.createdAt
					}
					const message =
						lastMessage.userId === user?.uid ? 'You: ' + lastMessage.content : lastMessage.content
					if (lastMessage?.createdAt?.toDate) lastMessage.createdAt = lastMessage.createdAt.toDate()

					return (
						<UserCard
							id={group.id}
							key={group.id}
							message={message}
							username={group.name}
							avatar={group.avatar}
							date={lastMessage.createdAt}
							unread={messagesUnread.length}
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
