import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../../../store'
import { useFetchMessage } from '../../../../services/chat'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Avatar, Box, Spinner, Text, View } from 'native-base'
import { CustomInput } from '../../../../components/shared/CustomInput'

export default function Chat(): JSX.Element {
	const router = useRouter()
	const { id: groupId } = useLocalSearchParams()
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors }
	} = useForm<{ message: string }>()
	const { isLoading, mutate } = useFetchMessage()
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const group = groups.find((group) => group.id === groupId)
	if (!group) return <Text>Group not found</Text>

	const chat = useMemo(() => {
		const messages = [...group.chat]
		// messages.sort((a, b) => {
		//   if (a?.createdAt?.toDate && b?.createdAt?.toDate) return a.createdAt.toDate().getTime() - b.createdAt.toDate().getTime()
		//   return 0
		// })
		return messages
	}, [group])

	console.log(chat)
	const onSubmit = ({ message }: { message: string }) => {
		if (!message) return
		mutate({ message, groupId })
		reset()
	}

	return (
		<View pt='16' bg='blueGray.900' px='0'>
			<Box px='5' pb='3' flexDir='row' justifyContent='space-between'>
				<Box width='3/5' flexDir='row' alignItems='center'>
					<Box flexDir='row' alignItems='center' width='5' ml='-2' mr='2' h='full'>
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name='chevron-back' size={20} color='white' />
						</TouchableOpacity>
					</Box>
					<Avatar
						size='md'
						source={{
							uri: group.avatar
						}}
					></Avatar>
					<Text width='4/6' numberOfLines={1} ml='4' fontSize='md' fontWeight='semibold'>
						{group.name}
					</Text>
				</Box>
				<Box width='2/5' flexDir='row' justifyContent='flex-end' alignItems='center'>
					<TouchableOpacity>
						<Feather name='more-vertical' size={24} color='white' />
					</TouchableOpacity>
				</Box>
			</Box>
			<Box px='5' h='full' bg='blueGray.800'>
				<Box h='4/5'>
					{chat.map((message, index) => (
						<Text key={index}>{message.content}</Text>
					))}
				</Box>
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
						error={errors.message}
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
			{/* 
      <Text>Chat: {group.name}</Text>
      <Button width='20' onTouchEnd={() => {
        router.push(routes.home)
      }}>
        Go back
      </Button> */}
		</View>
	)
}
