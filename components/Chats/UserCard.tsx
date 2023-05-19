import { format } from 'date-fns'
import { useRouter } from 'expo-router'
import { Flex, Text } from 'native-base'
import { routes } from '../../utils/routes'
import { TouchableOpacity } from 'react-native'
import { CustomAvatar } from '../shared/CustomAvatar'

interface UserCardProps {
	id: string
	username: string
	avatar: string
	message: string
	date: Date
	unread: number
}

export const UserCard = (props: UserCardProps): JSX.Element => {
	const router = useRouter()

	return (
		<TouchableOpacity
			onPress={() => {
				router.push(routes.chat(props.id))
			}}
		>
			<Flex flexDir='row' height='20'>
				<Flex width='1/5' ml='-1' justifyContent='center' alignItems='center'>
					<CustomAvatar size='lg' imageURI={props.avatar} />
				</Flex>
				<Flex width='4/5' pl='2' justifyContent='center'>
					<Flex flexDir='row' justifyContent='space-between' alignItems='center' pb='1'>
						<Text fontWeight='bold' fontSize='md'>
							{props.username}
						</Text>
						<Text fontSize='xs'>{format(props.date, 'p')}</Text>
					</Flex>
					<Flex flexDir='row' justifyContent='space-between'>
						<Text
							numberOfLines={2}
							fontSize='sm'
							color='blueGray.400'
							width={props.unread > 0 ? '5/6' : 'full'}
						>
							{props.message}
						</Text>
						{props.unread > 0 && (
							<Flex justifyContent='center' width='6' bg='green.500' height='6' borderRadius='full'>
								<Text color='white' fontSize='xs' textAlign='center' fontWeight='bold'>
									{props.unread}
								</Text>
							</Flex>
						)}
					</Flex>
				</Flex>
			</Flex>
		</TouchableOpacity>
	)
}
