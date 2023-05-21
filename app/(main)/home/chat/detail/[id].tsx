import { useLocalSearchParams } from 'expo-router'
import { useAppSelector } from '../../../../../store'
import { Box, Divider, HStack, Text, View } from 'native-base'
import { Header } from '../../../../../components/shared/Header'
import { GroupMenu } from '../../../../../components/Chats/GroupMenu'
import { CustomAvatar } from '../../../../../components/shared/CustomAvatar'
import { EventCard } from '../../../../../components/events/EventCard'
import { useMemo } from 'react'

export default function DetailtChat() {
	const { id: groupId } = useLocalSearchParams()
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const group = groups.find((group) => group.id === groupId)

	const eventsSorted = useMemo(
		() => [...(group?.events ?? [])].sort((a, b) => a.createdAt - b.createdAt),
		[group?.events]
	)

	return (
		<View>
			<Header
				route=''
				secondaryText=''
				variant='secondary'
				primaryText='Detail'
				showIcon={{
					icon: <GroupMenu group={group} />,
					onPress: () => {}
				}}
			/>
			<Box mt='5' alignItems='center'>
				<CustomAvatar imageURI={group?.avatar} size='2xl' />
				<Text mt='2' fontSize='xl' fontWeight='semibold'>
					{group?.name}
				</Text>
				<Text color='blueGray.600' fontSize='md' fontWeight='semibold'>
					{group?.members.length} members
				</Text>
				<Text mt='2'>{group?.description}</Text>
			</Box>
			<Divider mt='5' mb='3' bg='indigo.500' />
			<Box>
				<Text fontSize='xl' fontWeight='semibold'>
					Images & Files
				</Text>
				<HStack space={3} mt='2'>
					<Box h='20' w='20' bg='primary.300' rounded='md' shadow={3} />
					<Box h='20' w='20' bg='primary.500' rounded='md' shadow={3} />
				</HStack>
			</Box>
			<Divider mt='6' mb='3' bg='indigo.500' />
			<Box>
				<Text fontSize='xl' fontWeight='semibold'>
					Events
				</Text>
				{eventsSorted?.map((event) => (
					<EventCard event={event} handlePress={() => {}} key={event.id} />
				))}
			</Box>
		</View>
	)
}
