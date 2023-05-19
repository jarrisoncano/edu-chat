import { useAssets } from 'expo-asset'
import { useForm } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { Feather } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import { useAppSelector } from '../../../../store'
import { ImageBackground, TouchableOpacity } from 'react-native'
import { Box, ScrollView, Spinner, Text, View } from 'native-base'
import { ChatMessage } from '../../../../components/Chats/Message'
import { ChatHeader } from '../../../../components/Chats/ChatHeader'
import { CustomInput } from '../../../../components/shared/CustomInput'
import { useFetchMessage, useFetchReadMessages } from '../../../../services/chat'

export default function Chat(): JSX.Element {
	const { id: groupId } = useLocalSearchParams()
	const { isLoading, mutate } = useFetchMessage()
	const fetchReadMessages = useFetchReadMessages()
	const { control, reset, handleSubmit } = useForm<{ message: string }>()
	const [assets] = useAssets([require('../../../../assets/wallpapers/bg.png')])

	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const group = groups.find((group) => group.id === groupId)
	if (!group) return <Text>Group not found</Text>

	const chat = useMemo(() => {
		const messages = [...group.chat]
		return messages
	}, [group])

	const onSubmit = ({ message }: { message: string }) => {
		if (!message) return
		mutate({ message, groupId })
		reset()
	}

	useEffect(() => {
		fetchReadMessages.mutate({ groupId })
	}, [group])

	return (
		<View pt='16' bg='blueGray.900' px='0'>
			<ChatHeader group={group} />
			<ImageBackground
				resizeMode='cover'
				style={{
					height: '100%'
				}}
				source={{ uri: assets?.[0].uri ?? undefined }}
			>
				<Box px='5' h='full'>
					<ScrollView py='2' maxH='4/5' flexDir='column-reverse'>
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
						bg='blueGray.900'
						px='3'
					>
						<CustomInput
							name='message'
							control={control}
							variant='unstyled'
							height={10}
							style={{ width: '85%', backgroundColor: 'blueGray.800' }}
							backgroundColor='blueGray.900'
							error={undefined}
							type='text'
							placeholder='Message...'
							label=''
						/>
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
				</Box>
			</ImageBackground>
		</View>
	)
}
