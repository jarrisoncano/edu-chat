import { useMemo, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useAppSelector } from '../../../../../store'
import { Header } from '../../../../../components/shared/Header'
import { GroupMenu } from '../../../../../components/Chats/GroupMenu'
import { EventCard } from '../../../../../components/events/EventCard'
import { CustomAvatar } from '../../../../../components/shared/CustomAvatar'
import { Box, Divider, HStack, Modal, ScrollView, Text, View } from 'native-base'

export default function DetailtChat() {
	const [showQr, setShowQr] = useState(false)
	const { id: groupId } = useLocalSearchParams()
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const group = groups.find((group) => group.id === groupId)

	const eventsSorted = useMemo(
		() => [...(group?.events ?? [])].sort((a, b) => a.createdAt - b.createdAt),
		[group?.events]
	)

	return (
		<View>
			<Modal isOpen={!!showQr} onClose={() => setShowQr(!showQr)}>
				<Modal.Content alignItems='center' w='2/4'>
					<QRCode value={groupId} size={200} />
				</Modal.Content>
			</Modal>
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
				<TouchableOpacity
					onPress={() => {
						setShowQr(true)
					}}
				>
					<AntDesign name='qrcode' size={28} color='darkgray' />
				</TouchableOpacity>
			</Box>
			<ScrollView showsHorizontalScrollIndicator={false} maxH='lg' w='full'>
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
			</ScrollView>
		</View>
	)
}
