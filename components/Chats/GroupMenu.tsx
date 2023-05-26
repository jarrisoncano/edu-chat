import { FC } from 'react'
import { useRouter } from 'expo-router'
import { Group } from '../../types/Group'
import { routes } from '../../utils/routes'
import { useAppSelector } from '../../store'
import { Feather } from '@expo/vector-icons'
import { Menu, Pressable, Text, useColorMode } from 'native-base'
import { useFetchDeleteGroup, useFetchLeaveGroup } from '../../services/groups'

interface Props {
	group: Group | undefined
}

export const GroupMenu: FC<Props> = (props) => {
	const router = useRouter()
	const { colorMode } = useColorMode()
	const { mutate } = useFetchDeleteGroup()
	const fetchLeaveGroup = useFetchLeaveGroup()
	const user = useAppSelector((state) => state.userSlice.user)
	const isAdmin = props.group?.admins.includes(user?.uid ?? '')

	const color = colorMode === 'dark' ? 'white' : 'black'

	return (
		<Menu
			w='190'
			trigger={(triggerProps) => {
				return (
					<Pressable accessibilityLabel='More options menu' {...triggerProps}>
						<Feather name='more-vertical' size={20} color={color} />
					</Pressable>
				)
			}}
		>
			{isAdmin ? (
				<>
					<Menu.Item
						onPress={() => {
							router.push(routes.updateGroup(props.group?.id ?? ''))
						}}
					>
						Edit
					</Menu.Item>
					<Menu.Item
						onPress={() => {
							router.push(routes.home)
							mutate(props.group?.id ?? '')
						}}
					>
						<Text color='red.500'>Delete</Text>
					</Menu.Item>
				</>
			) : (
				<Menu.Item
					onPress={() => {
						fetchLeaveGroup.mutate({
							groupId: props.group?.id ?? '',
							userId: user?.uid ?? ''
						})
					}}
				>
					<Text color='red.500'>Leave</Text>
				</Menu.Item>
			)}
		</Menu>
	)
}
