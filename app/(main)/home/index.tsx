import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { routes } from '../../../utils/routes'
import { AntDesign } from '@expo/vector-icons'
import { useAppSelector } from '../../../store'
import { Box, Fab, Icon, View } from 'native-base'
import { UserCard } from '../../../components/Chats/UserCard'
import { CustomInput } from '../../../components/shared/CustomInput'


export default function Home(): JSX.Element {
	const { control } = useForm()
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	return (
		<View>
			<Box>
				<CustomInput height='12' label='' name='find' control={control} placeholder='Search...' />
			</Box>
			<Box mt='10'>
				{
					groups.map((group) => {
						const messagesUnread = group.chat.filter((message) => message.status?.read.includes(group.id) === false)
						const lastMessage = group.chat[group.chat.length - 1] || { content: 'Write the first message', createdAt: group.createdAt }
						// Write the first message lorem ipsum lorem sds ifsdmsf fsdf essage lorem ipsum essage lorem ipsum
						return <UserCard key={group.id} id={group.id} username={group.name} avatar={group.avatar} unread={messagesUnread.length} message={lastMessage.content} date={lastMessage.createdAt} />

					})
				}
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
