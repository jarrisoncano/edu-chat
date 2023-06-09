import { FC } from 'react'
import { formatISO } from 'date-fns'
import { useRouter } from 'expo-router'
import { routes } from '../../utils/routes'
import { AntDesign } from '@expo/vector-icons'
import { SelectedEvent } from '../../types/Group'
import { Linking, TouchableOpacity } from 'react-native'
import { useFetchDeleteEvent } from '../../services/groups'
import { Box, Button, HStack, Modal, Text, useColorMode } from 'native-base'
import { useI18n } from '../../i18n/usei18n'

interface Props {
	event: SelectedEvent | null
	handleClose: () => void
}

export const EventModal: FC<Props> = (props) => {
	const i18n = useI18n()
	const router = useRouter()
	const { colorMode } = useColorMode()
	const { mutate, isLoading } = useFetchDeleteEvent()
	const startDate = props.event?.startDate?.toDate() as Date
	const endDate = props.event?.endDate?.toDate() as Date
	const isoStartDate = startDate ? formatISO(startDate, { format: 'basic', representation: 'date' }) : ''
	const isoEndDate = endDate ? formatISO(endDate, { format: 'basic', representation: 'date' }) : ''

	const color = colorMode === 'dark' ? 'white' : 'black'
	const bgColor = colorMode === 'dark' ? 'blueGray.800' : 'white'

	const handleEdit = () => {
		if (props.event) {
			router.push(routes.updateEvent)
		}
	}

	const handleDelete = () => {
		if (props.event) {
			mutate({
				groupId: props.event.groupId,
				eventId: props.event.id
			})
			props.handleClose()
		}
	}

	return (
		<Modal isOpen={!!props.event} onClose={() => props.handleClose()}>
			<Modal.Content>
				<Modal.CloseButton />
				<Modal.Header bg={props.event?.color}>
					<Text color='white' fontSize='lg' bold>
						{props.event?.title}
					</Text>
				</Modal.Header>
				<Modal.Body bg={bgColor}>
					<Text fontWeight='semibold'>{i18n.description}:</Text>
					<Text>{props.event?.description}</Text>
					<Text mt='2' fontWeight='semibold'>
						{i18n.events.form.startDate}: <Text fontWeight='thin'>{startDate?.toLocaleDateString()}</Text>
					</Text>
					<Text fontWeight='semibold'>
						{i18n.events.form.endDate}: <Text fontWeight='thin'>{endDate?.toLocaleDateString()}</Text>
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
										{i18n.events.addTo}
									</Text>
									<AntDesign name='google' size={24} color={color} />
								</HStack>
							</TouchableOpacity>
						</Box>

						{props.event?.isAdmin && (
							<HStack w='3/6' justifyContent='flex-end' space={3}>
								<Box w='10' justifyContent='center' alignItems='center'>
									<TouchableOpacity
										onPress={() => {
											handleEdit()
										}}
									>
										<AntDesign name='edit' size={24} color={color} />
									</TouchableOpacity>
								</Box>
								<Button
									isLoading={isLoading}
									bg='red.500'
									w='20'
									_pressed={{ bgColor: 'red.600' }}
									onPress={() => {
										handleDelete()
									}}
								>
									<Text textAlign='center'>{i18n.delete}</Text>
								</Button>
							</HStack>
						)}
					</HStack>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	)
}
