import { FC } from 'react'
import { formatISO } from 'date-fns'
import { type Event } from '../../types/Group'
import { AntDesign } from '@expo/vector-icons'
import { Linking, TouchableOpacity } from 'react-native'
import { Box, Button, HStack, Modal, Text } from 'native-base'

interface Props {
	edit: boolean
	event: Event | null
	handleClose: () => void
}

export const EventModal: FC<Props> = (props) => {
	const startDate = props.event?.startDate?.toDate() as Date
	const endDate = props.event?.endDate?.toDate() as Date
	const isoStartDate = startDate ? formatISO(startDate, { format: 'basic', representation: 'date' }) : ''
	const isoEndDate = endDate ? formatISO(endDate, { format: 'basic', representation: 'date' }) : ''

	return (
		<Modal isOpen={!!props.event} onClose={() => props.handleClose()}>
			<Modal.Content>
				<Modal.CloseButton />
				<Modal.Header bg={props.event?.color}>
					<Text color='white' fontSize='lg' bold>
						{props.event?.title}
					</Text>
				</Modal.Header>
				<Modal.Body bg='blueGray.800'>
					<Text fontWeight='semibold'>Description:</Text>
					<Text>{props.event?.description}</Text>
					<Text mt='2' fontWeight='semibold'>
						Start Date: <Text fontWeight='thin'>{startDate?.toLocaleDateString()}</Text>
					</Text>
					<Text fontWeight='semibold'>
						End Date: <Text fontWeight='thin'>{endDate?.toLocaleDateString()}</Text>
					</Text>
					<HStack mt='3' space={2} justifyContent='space-between'>
						<Box bg='blue.500' w='2/6' borderRadius='sm' alignItems='center' justifyContent='center' p='2'>
							<TouchableOpacity
								onPress={() => {
									Linking.openURL(
										`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${props.event?.title}&details=${props.event?.description}&dates=${isoStartDate}/${isoEndDate}&sf=true&output=xml`
									)
								}}
							>
								<HStack pointerEvents='none' space='1' alignItems='center'>
									<Text fontSize='xs' textAlign='center'>
										Add to
									</Text>
									<AntDesign name='google' size={24} color='white' />
								</HStack>
							</TouchableOpacity>
						</Box>

						{props.edit && (
							<HStack w='3/6' justifyContent='flex-end' space={3}>
								<Box w='10' justifyContent='center' alignItems='center'>
									<TouchableOpacity>
										<AntDesign name='edit' size={24} color='white' />
									</TouchableOpacity>
								</Box>
								<Button bg='red.500' w='20' _pressed={{ bgColor: 'red.600' }}>
									<Text textAlign='center'>Delete</Text>
								</Button>
							</HStack>
						)}
					</HStack>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	)
}
