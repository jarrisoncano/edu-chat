import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import EmojiModal from 'react-native-emoji-modal'
import { routes } from '../../../../utils/routes'
import { useAppSelector } from '../../../../store'
import { sortChat } from '../../../../utils/sortChat'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { AntDesign, Entypo, Feather } from '@expo/vector-icons'
import { Ref, useEffect, useMemo, useRef, useState } from 'react'
import { ChatMessage } from '../../../../components/Chats/Message'
import { ChatHeader } from '../../../../components/Chats/ChatHeader'
import { CustomInput } from '../../../../components/shared/CustomInput'
import { getImageFromLibary } from '../../../../components/utils/getImage'
import { Box, ScrollView, Spinner, Text, View, useColorMode } from 'native-base'
import { useFetchMessage, useFetchReadMessages } from '../../../../services/chat'
import { useI18n } from '../../../../i18n/usei18n'

interface Form {
	message: string
	image: string
}

export default function Chat(): JSX.Element {
	const i18n = useI18n()
	const router = useRouter()
	const { colorMode } = useColorMode()
	const scrollViewRef = useRef<any>(null)
	const { id: groupId } = useLocalSearchParams()
	const { isLoading, mutate } = useFetchMessage()
	const fetchReadMessages = useFetchReadMessages()
	const [showEmoji, setShowEmoji] = useState(false)
	const { watch, control, reset, setValue, handleSubmit } = useForm<Form>({
		defaultValues: {
			message: '',
			image: ''
		}
	})

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
		const messagesSorted = sortChat(messages)
		return messagesSorted
	}, [group])

	const handleImage = async () => {
		const img = await getImageFromLibary()
		if (img != null) setValue('image', img.uri)
	}

	const onSubmit = ({ message, image }: Form) => {
		const imageToSend = image ?? ''
		const messageToSend = message ?? ''
		if (messageToSend === '' && imageToSend === '') return

		mutate({ message: messageToSend, groupId, image: image ?? '' })
		reset({ message: '', image: '' })
		setShowEmoji(false)
	}

	useEffect(() => {
		if (!groupId) return
		fetchReadMessages.mutate({ groupId })
	}, [groupId, chat])

	return group ? (
		<View pt='16' bg={bgColor2} px='0' position='relative'>
			<ChatHeader group={group} />
			<Box bg={bgColor} px='5' h='full'>
				<ScrollView
					py='2'
					maxH={showEmoji ? '3/6' : '5/6'}
					flexDir='column'
					ref={scrollViewRef}
					onContentSizeChange={() => {
						scrollViewRef.current
						if (scrollViewRef.current) scrollViewRef.current?.scrollToEnd({ animated: false })
					}}
				>
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
						style={{ width: '70%', backgroundColor: bgColor }}
						backgroundColor={bgColor2}
						error={undefined}
						type='text'
						placeholder={i18n?.chat.inputPlaceholder ?? ''}
						label=''
					/>
					<TouchableOpacity
						onPress={() => {
							handleImage()
						}}
					>
						<AntDesign
							style={{ marginRight: 10 }}
							name={watch('image') ? 'jpgfile1' : 'addfile'}
							size={21}
							color={watch('image') ? 'green' : color}
						/>
					</TouchableOpacity>
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
