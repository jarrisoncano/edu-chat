import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import EmojiModal from 'react-native-emoji-modal'
import { routes } from '../../../../utils/routes'
import { useAppSelector } from '../../../../store'
import { useEffect, useMemo, useState } from 'react'
import { Entypo, Feather } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChatMessage } from '../../../../components/Chats/Message'
import { ChatHeader } from '../../../../components/Chats/ChatHeader'
import { CustomInput } from '../../../../components/shared/CustomInput'
import { Box, ScrollView, Spinner, Text, View, useColorMode } from 'native-base'
import { useFetchMessage, useFetchReadMessages } from '../../../../services/chat'

export default function Chat(): JSX.Element {
	const router = useRouter()
	const { colorMode } = useColorMode()
	const { id: groupId } = useLocalSearchParams()
	const { isLoading, mutate } = useFetchMessage()
	const fetchReadMessages = useFetchReadMessages()
	const [showEmoji, setShowEmoji] = useState(false)
	const { watch, control, reset, handleSubmit } = useForm<{ message: string }>()

	const color = colorMode === 'dark' ? 'gray' : 'black'
	const bgColor = colorMode === 'dark' ? 'blueGray.800' : 'white'
	const bgColor2 = colorMode === 'dark' ? 'blueGray.900' : 'blueGray.100'

	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const group = groups.find((group) => group.id === groupId)
	if (!group) {
		router.push(routes.home)
	}

	const chat = useMemo(() => {
		const messages = [...(group?.chat ?? [])]
		return messages
	}, [group])

	const onSubmit = ({ message }: { message: string }) => {
		if (!message) return
		mutate({ message, groupId })
		reset({ message: '' })
		setShowEmoji(false)
	}

	useEffect(() => {
		if (!groupId) return
		fetchReadMessages.mutate({ groupId })
	}, [groupId])

	return group ? (
		<View pt='16' bg={bgColor2} px='0' position='relative'>
			<ChatHeader group={group} />
			<Box bg={bgColor} px='5' h='full'>
				<ScrollView py='2' maxH={showEmoji ? '3/6' : '5/6'} flexDir='column-reverse'>
					{chat.map((message, index) => (
						<ChatMessage key={index} message={message} />
					))}
				</ScrollView>
				<Box
					h='16'
					flexDir='row'
					borderRadius='2xl'
					justifyContent='space-between'
					alignItems='center'
					bg={bgColor2}
					px='3'
				>
					<CustomInput
						name='message'
						control={control}
						variant='unstyled'
						height={10}
						style={{ width: '80%', backgroundColor: bgColor }}
						backgroundColor={bgColor2}
						error={undefined}
						type='text'
						placeholder='Message...'
						label=''
					/>
					<TouchableOpacity
						onPress={() => {
							setShowEmoji(!showEmoji)
						}}
					>
						<Entypo name='emoji-happy' style={{ marginRight: 10 }} size={20} color={color} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							handleSubmit(onSubmit)()
						}}
					>
						<Box
							bgColor='blueGray.700'
							width='10'
							h='10'
							flexDir='row'
							borderRadius='lg'
							justifyContent='center'
							alignItems='center'
						>
							{isLoading ? (
								<Spinner color='indigo.400' />
							) : (
								<Feather name='send' size={20} color='#818cf8' />
							)}
						</Box>
					</TouchableOpacity>
				</Box>
				{showEmoji && (
					<Box h='72' bg={bgColor}>
						<Text>
							<EmojiModal
								containerStyle={{
									width: '100%',
									backgroundColor: colorMode === 'dark' ? '#293443' : '#fff',
									height: '100%'
								}}
								modalStyle={{
									backgroundColor: colorMode === 'dark' ? '#1f2937' : '#fff'
								}}
								shortcutColor={colorMode === 'dark' ? '#a7a7a7' : '#000'}
								activeShortcutColor={colorMode === 'dark' ? '#fff' : '#000'}
								headerStyle={{
									color: colorMode === 'dark' ? '#fff' : '#000'
								}}
								columns={10}
								onEmojiSelected={(emoji) => {
									const crrMessage = watch('message') ?? ''
									reset({ message: crrMessage + emoji })
								}}
							/>
						</Text>
					</Box>
				)}
			</Box>
		</View>
	) : (
		<></>
	)
}
