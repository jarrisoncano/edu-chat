import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { routes } from '../../../utils/routes'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../../store'
import { type Event } from '../../../types/Group'
import { MaterialIcons } from '@expo/vector-icons'
import { Box, Fab, Icon, Text, View } from 'native-base'
import { EventCard } from '../../../components/events/EventCard'
import { EventModal } from '../../../components/events/EventModal'

export default function Events(): JSX.Element {
	const [selectedUtils, setSelectedUtils] = useState({
		edit: false,
		groupId: ''
	})
	const user = useAppSelector((state) => state.userSlice.user)
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

	const groupsFiltered = useMemo(() => {
		return groups.filter((group) => group.events.length > 0)
	}, [groups])

	return (
		<View>
			<EventModal utils={selectedUtils} event={selectedEvent} handleClose={() => setSelectedEvent(null)} />
			<Box mt='2' flexDir='row' justifyContent='space-between' alignItems='center'>
				<Text numberOfLines={1} width='5/6' fontSize='2xl' bold>
					Events
				</Text>
				<Box alignItems='flex-end' width='1/6'>
					<TouchableOpacity onPress={() => {}}>
						<MaterialIcons name='more-vert' size={25} color='white' />
					</TouchableOpacity>
				</Box>
			</Box>
			<Box mt='7'>
				{groupsFiltered.map((group) => (
					<Box key={group.id} mt='2'>
						<Text fontSize='lg' bold>
							{group.name}
						</Text>
						<Box>
							{group.events.map((event, i) => (
								<EventCard
									key={i}
									event={event}
									handlePress={() => {
										setSelectedEvent(event)
										setSelectedUtils({
											edit: group.admins.includes(user?.uid || ''),
											groupId: group.id
										})
									}}
								/>
							))}
						</Box>
					</Box>
				))}
			</Box>
			<CreateEventButton />
		</View>
	)
}

const CreateEventButton = () => {
	const router = useRouter()

	return (
		<Fab
			renderInPortal={false}
			shadow={2}
			width='12'
			onPress={() => {
				router.push(routes.createEvent)
			}}
			height='12'
			icon={<Icon color='white' as={AntDesign} name='plus' size='sm' />}
		/>
	)
}
