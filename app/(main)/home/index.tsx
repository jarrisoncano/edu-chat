import { useMemo } from 'react'
import { useRouter } from 'expo-router'
import { routes } from '../../../utils/routes'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../../store'
import { sortChat } from '../../../utils/sortChat'
import { type Message } from '../../../types/Group'
import { UserCard } from '../../../components/Chats/UserCard'
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, Fab, HStack, Icon, ScrollView, Text, View, useColorMode } from 'native-base'
import { useI18n } from '../../../i18n/usei18n'

export default function Home(): JSX.Element {
	const i18n = useI18n()
	const router = useRouter()
	const { colorMode } = useColorMode()
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)
	const groups = useAppSelector((state) => state.groupsSlice.groups)

	const iconColor = colorMode === 'dark' ? 'white' : 'black'

	const groupsSorted = useMemo(() => {
		const copyOfGroups = [...groups]

		copyOfGroups.sort((a, b) => {
			const messagesSortedA = sortChat([...a.chat])
			const messagesSortedB = sortChat([...b.chat])

			const aLastMessage = messagesSortedA[messagesSortedA.length - 1]
			const bLastMessage = messagesSortedB[messagesSortedB.length - 1]

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
				<Text numberOfLines={1} width='4/6' fontSize='lg' fontWeight='light'>
					{i18n?.home.hello} <Text bold>{user?.name} ✨</Text>
				</Text>
				<HStack space={7} justifyContent='flex-end' width='2/6'>
					<TouchableOpacity>
						<MaterialCommunityIcons name='qrcode-scan' size={20} color={iconColor} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => router.push(routes.users)}>
						<FontAwesome5 name='users' size={20} color={iconColor} />
					</TouchableOpacity>
				</HStack>
			</Box>
			<Box mt='7'>
				<ScrollView h='95%'>
					{groupsSorted.map((group) => {
						const messageSorted = sortChat([...group.chat])
						const messagesUnread = messageSorted.filter(
							(message) => message.status?.read.includes(user?.uid ?? '') === false
						)

						const lastMessage: Message = messageSorted[messageSorted.length - 1] || {
							content: i18n?.chat.firstMessage,
							createdAt: group.createdAt
						}

						const userToDisplay = users.find((user) => user.uid === lastMessage.userId)
						let message =
							lastMessage.userId === user?.uid
								? `${i18n.chat.you}: ${!!lastMessage.image ? '📸' : ''} ${lastMessage.content}`
								: `${userToDisplay?.name ?? ''}: ${!!lastMessage.image ? '📸' : ''} ${
										lastMessage.content
								  }`

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
