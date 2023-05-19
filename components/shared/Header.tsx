import React, { type FC } from 'react'
import { useRouter } from 'expo-router'
import { Box, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

interface Props {
	variant?: 'primary' | 'secondary'
	showIcon?: boolean
	primaryText: string
	secondaryText: string
	route: string
}
export const Header: FC<Props> = (props) => {
	const router = useRouter()
	return props.variant === 'primary' || !props.variant ? (
		<Box flexDirection='row' justifyContent='space-between'>
			<Box width='2/3'>
				<Text color='white' fontSize='2xl' fontWeight='bold'>
					{props.primaryText}
				</Text>
				<Text color='blueGray.400' fontSize='sm'>
					{props.secondaryText}
				</Text>
			</Box>
			<Box width='25px'>
				<TouchableOpacity
					onPress={() => {
						router.push(props.route)
					}}
				>
					<Ionicons name='ios-close' size={25} color='white' />
				</TouchableOpacity>
			</Box>
		</Box>
	) : (
		<Box flexDir='row' justifyContent='space-between'>
			<Box width='5/6' flexDir='row' alignItems='center'>
				<Box flexDir='row' alignItems='center' width='5' ml='-2' h='full'>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name='chevron-back' size={20} color='white' />
					</TouchableOpacity>
				</Box>
				<Text numberOfLines={1} ml='2' fontSize='md' fontWeight='semibold'>
					{props.primaryText}
				</Text>
			</Box>
			{props.showIcon && (
				<Box width='1/6' alignItems='flex-end'>
					<TouchableOpacity onPress={() => router.push(props.route)}>
						<Ionicons name='person-add' size={20} color='white' />
					</TouchableOpacity>
				</Box>
			)}
		</Box>
	)
}
