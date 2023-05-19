import { FC } from 'react'
import { Box, Text } from 'native-base'
import { useRouter } from 'expo-router'
import { GroupMenu } from './GroupMenu'
import { routes } from '../../utils/routes'
import { type Group } from '../../types/Group'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { CustomAvatar } from '../shared/CustomAvatar'

interface Props {
	group: Group
}

export const ChatHeader: FC<Props> = (props) => {
	const router = useRouter()

	return (
		<Box px='5' pb='3' flexDir='row' justifyContent='space-between'>
			<Box width='4/5' flexDir='row' alignItems='center'>
				<Box flexDir='row' alignItems='center' width='5' ml='-2' mr='2' h='full'>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name='chevron-back' size={20} color='white' />
					</TouchableOpacity>
				</Box>
				<TouchableOpacity
					onPress={() => {
						router.push(routes.detailChat(props.group.id))
					}}
				>
					<Box flexDir='row' alignItems='center'>
						<CustomAvatar size='sm' imageURI={props.group.avatar} />
						<Text width='4/6' numberOfLines={1} ml='4' fontSize='md' fontWeight='semibold'>
							{props.group.name}
						</Text>
					</Box>
				</TouchableOpacity>
			</Box>
			<Box width='1/5' flexDir='row' justifyContent='flex-end' alignItems='center'>
				<GroupMenu group={props.group} />
			</Box>
		</Box>
	)
}
