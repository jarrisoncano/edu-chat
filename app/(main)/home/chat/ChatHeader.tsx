import { FC } from 'react'
import { Box, Text } from 'native-base'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { type Group } from '../../../../types/Group'
import { Feather, Ionicons } from '@expo/vector-icons'
import { CustomAvatar } from '../../../../components/shared/CustomAvatar'

interface Props {
	group: Group
}

export const ChatHeader: FC<Props> = (props) => {
	const router = useRouter()

	return (
		<Box px='5' pb='3' flexDir='row' justifyContent='space-between'>
			<Box width='3/5' flexDir='row' alignItems='center'>
				<Box flexDir='row' alignItems='center' width='5' ml='-2' mr='2' h='full'>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name='chevron-back' size={20} color='white' />
					</TouchableOpacity>
				</Box>
				<CustomAvatar size='sm' imageURI={props.group.avatar} />
				<Text width='4/6' numberOfLines={1} ml='4' fontSize='md' fontWeight='semibold'>
					{props.group.name}
				</Text>
			</Box>
			<Box width='2/5' flexDir='row' justifyContent='flex-end' alignItems='center'>
				<TouchableOpacity>
					<Feather name='more-vertical' size={24} color='white' />
				</TouchableOpacity>
			</Box>
		</Box>
	)
}
