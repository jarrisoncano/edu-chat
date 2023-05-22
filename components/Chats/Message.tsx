import { FC } from 'react'
import { format } from 'date-fns'
import { Box, Text } from 'native-base'
import { Message } from '../../types/Group'
import { useAppSelector } from '../../store'

interface Props {
	message: Message
}

export const ChatMessage: FC<Props> = (props) => {
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)

	const userFrom = users.find((user) => user.uid === props.message.userId)

	const isFromUser = user?.uid === props.message.userId
	const date = props.message.createdAt.toDate ? props.message.createdAt.toDate() : props.message.createdAt
	const dateFormatted = format(date, 'p')

	return (
		<Box
			alignSelf={isFromUser ? 'flex-end' : 'flex-start'}
			maxW='3/5'
			p='2'
			pb='1'
			bg={isFromUser ? 'blueGray.900' : 'blueGray.700'}
			mb='2'
			borderRadius='xl'
		>
			<Box w='full'>
				<Text fontSize='xs' color='white' fontWeight='bold' lineHeight='xs'>
					{user?.name === userFrom?.name ? 'You' : userFrom?.name}
				</Text>
			</Box>
			<Text mt='1'>{props.message.content}</Text>
			<Text fontSize='xs' color='white' textAlign='right' w='full' lineHeight='xs'>
				{dateFormatted}
			</Text>
		</Box>
	)
}
