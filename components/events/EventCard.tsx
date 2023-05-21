import { FC } from 'react'
import { Box, Text } from 'native-base'
import { Event } from '../../types/Group'
import { TouchableOpacity } from 'react-native'

interface Props {
	event: Event
	handlePress: () => void
}

export const EventCard: FC<Props> = (props) => {
	const event = props.event

	const createdDate = event.createdAt.toDate ? event.createdAt.toDate() : event.createdAt
	const startDate = event.startDate.toDate ? event.startDate.toDate() : event.startDate
	const endDate = event.endDate.toDate ? event.endDate.toDate() : event.endDate

	const onPress = () => {
		props.handlePress()
	}

	return (
		<TouchableOpacity onPress={onPress}>
			<Box mt='2' key={createdDate} bg={event.color} borderRadius='md' px='2' py='1'>
				<Box flexDir='row' justifyContent='space-between'>
					<Text numberOfLines={2} w='4/6' fontSize='md' bold>
						{event.title}
					</Text>
					<Text w='2/6' textAlign='right' fontSize='xs'>
						{createdDate.toLocaleDateString()}
					</Text>
				</Box>
				<Box mt='2'>
					<Text numberOfLines={1} fontSize='sm'>
						{event.description}
					</Text>
				</Box>
				<Box>
					<Text fontSize='sm' fontWeight='thin'>
						{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
					</Text>
				</Box>
			</Box>
		</TouchableOpacity>
	)
}
