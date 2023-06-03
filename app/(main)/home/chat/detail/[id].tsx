import { useMemo, useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useI18n } from '../../../../../i18n/usei18n'
import { useAppSelector } from '../../../../../store'
import { Header } from '../../../../../components/shared/Header'
import { GroupMenu } from '../../../../../components/Chats/GroupMenu'
import { EventCard } from '../../../../../components/events/EventCard'
import { CustomAvatar } from '../../../../../components/shared/CustomAvatar'
import { Box, Divider, HStack, Image, Modal, ScrollView, Text, View } from 'native-base'

export default function DetailtChat() {
	const i18n = useI18n()
	const [showQr, setShowQr] = useState(false)
	const { id: groupId } = useLocalSearchParams()
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const group = groups.find((group) => group.id === groupId)

	const images = useMemo(() => [...(group?.chat ?? [])].filter((m) => !!m.image), [group?.chat])

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
				primaryText={i18n?.chat.detail ?? ''}
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
					{group?.members.length} {i18n?.chat.members}
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
						{i18n?.chat.imageAndFiles}
					</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<HStack space={3} mt='2'>
							{images.map((chat) => (
								<Image
									key={chat.image}
									source={{ uri: chat.image }}
									alt='image'
									size='lg'
									borderRadius='xl'
									mt='1'
								/>
							))}
						</HStack>
					</ScrollView>
				</Box>
				<Divider mt='6' mb='3' bg='indigo.500' />
				<Box>
					<Text fontSize='xl' fontWeight='semibold'>
						{i18n?.events.title}
					</Text>

					{eventsSorted?.map((event) => (
						<EventCard event={event} handlePress={() => {}} key={event.id} />
					))}
				</Box>
			</ScrollView>
		</View>
	)
}
