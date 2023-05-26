import { useMemo } from 'react'
import { useRouter } from 'expo-router'
import { routes } from '../../../utils/routes'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../../store'
import { type Message } from '../../../types/Group'
import { Box, Fab, Icon, ScrollView, Text, View, useColorMode } from 'native-base'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { UserCard } from '../../../components/Chats/UserCard'

export default function Home(): JSX.Element {
	const router = useRouter()
	const { colorMode } = useColorMode()
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)
	const groups = useAppSelector((state) => state.groupsSlice.groups)

	const iconColor = colorMode === 'dark' ? 'white' : 'black'

	const groupsSorted = useMemo(() => {
		const copyOfGroups = [...groups]

		copyOfGroups.sort((a, b) => {
			const aLastMessage = a.chat[a.chat.length - 1]
			const bLastMessage = b.chat[b.chat.length - 1]
			if (!aLastMessage || !bLastMessage) return a.createdAt > b.createdAt ? -1 : 1
			if (aLastMessage.createdAt > bLastMessage.createdAt) return -1
			if (aLastMessage.createdAt < bLastMessage.createdAt) return 1
			return 0
		})
		return copyOfGroups
	}, [groups])

	return (
		<View>
			<Box mt='2' flexDir='row' justifyContent='space-between' alignItems='center'>
				<Text numberOfLines={1} width='5/6' fontSize='lg' fontWeight='light'>
					Hello, <Text bold>{user?.name} ✨</Text>
				</Text>
				<Box alignItems='flex-end' width='1/6'>
					<TouchableOpacity onPress={() => router.push(routes.users)}>
						<FontAwesome5 name='users' size={24} color={iconColor} />
					</TouchableOpacity>
				</Box>
			</Box>
			<Box mt='7'>
				<ScrollView h='95%'>
					{groupsSorted.map((group) => {
						const messagesUnread = group.chat.filter(
							(message) => message.status?.read.includes(user?.uid ?? '') === false
						)
						const lastMessage: Message = group.chat[group.chat.length - 1] || {
							content: 'Write the first message',
							createdAt: group.createdAt
						}
						const userToDisplay = users.find((user) => user.uid === lastMessage.userId)
						const message =
							lastMessage.userId === user?.uid
								? 'You: ' + lastMessage.content
								: `${userToDisplay?.name}: ${lastMessage.content}`

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
				</ScrollView>
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
