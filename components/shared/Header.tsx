import React, { type FC } from 'react'
import { useRouter } from 'expo-router'
import { Box, Text, useColorMode } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

interface Props {
	variant?: 'primary' | 'secondary'
	showIcon?: {
		icon: JSX.Element
		onPress: () => void
	}
	primaryText: string
	secondaryText: string
	route: string
}
export const Header: FC<Props> = (props) => {
	const router = useRouter()
	const { colorMode } = useColorMode()
	const color = colorMode === 'dark' ? 'white' : 'black'

	return props.variant === 'primary' || !props.variant ? (
		<Box flexDirection='row' justifyContent='space-between'>
			<Box width='2/3'>
				<Text color={color} fontSize='2xl' fontWeight='bold'>
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
					<Ionicons name='ios-close' size={25} color={color} />
				</TouchableOpacity>
			</Box>
		</Box>
	) : (
		<Box flexDir='row' justifyContent='space-between'>
			<Box width='5/6' flexDir='row' alignItems='center'>
				<Box flexDir='row' alignItems='center' width='5' ml='-2' h='full'>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name='chevron-back' size={20} color={color} />
					</TouchableOpacity>
				</Box>
				<Text numberOfLines={1} ml='2' fontSize='md' fontWeight='semibold'>
					{props.primaryText}
				</Text>
			</Box>
			{props.showIcon && (
				<Box width='1/6' alignItems='flex-end'>
					<TouchableOpacity onPress={props.showIcon.onPress}>
						<props.showIcon.icon.type {...props.showIcon.icon.props} />
					</TouchableOpacity>
				</Box>
			)}
		</Box>
	)
}
