import { FC } from 'react'
import { format } from 'date-fns'
import { Message } from '../../types/Group'
import { useAppSelector } from '../../store'
import { Box, Image, Text, useColorMode } from 'native-base'

interface Props {
	message: Message
}

export const ChatMessage: FC<Props> = (props) => {
	const { colorMode } = useColorMode()
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)

	const userFrom = users.find((user) => user.uid === props.message.userId)

	const color = colorMode === 'dark' ? 'white' : 'black'
	const bgColor1 = colorMode === 'dark' ? 'blueGray.900' : 'blueGray.300'
	const bgColor2 = colorMode === 'dark' ? 'blueGray.700' : 'blueGray.100'

	const isFromUser = user?.uid === props.message.userId
	const date = props.message.createdAt.toDate ? props.message.createdAt.toDate() : props.message.createdAt
	const dateFormatted = format(date, 'p')

	return (
		<Box
			alignSelf={isFromUser ? 'flex-end' : 'flex-start'}
			maxW='3/5'
			p='2'
			pb='1'
			bg={isFromUser ? bgColor1 : bgColor2}
			mb='2'
			borderRadius='xl'
		>
			<Box w='full'>
				<Text fontSize='xs' color={color} fontWeight='bold' lineHeight='xs'>
					{user?.uid === props.message.userId ? 'You' : userFrom?.name}
				</Text>
			</Box>
			{!!props.message.image?.length && (
				<Image source={{ uri: props.message.image }} alt='image' size='2xl' borderRadius='xl' mt='1' />
			)}
			{props.message.content.length > 0 && <Text mt='1'>{props.message.content}</Text>}
			<Text fontSize='xs' color={color} textAlign='right' w='full' lineHeight='xs'>
				{dateFormatted}
			</Text>
		</Box>
	)
}
