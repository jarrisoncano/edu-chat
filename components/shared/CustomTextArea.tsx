import { FormControl, Input, useColorMode } from 'native-base'
import { type StyleProp, type ViewStyle } from 'react-native'
import { ResponsiveValue } from 'native-base/lib/typescript/components/types'
import { Controller, type ErrorOption, type RegisterOptions } from 'react-hook-form'

interface InputProps {
	name: string
	control: any
	maxLength?: number
	required?: boolean
	placeholder: string
	style?: StyleProp<ViewStyle>
	height?: ResponsiveValue<number | string>
	rules?: RegisterOptions
	error?: ErrorOption
	variant?: 'filled' | 'outline' | 'unstyled' | 'underlined' | 'rounded'
}

export const CustomTextArea = (props: InputProps): JSX.Element => {
	const { colorMode } = useColorMode()
	const bgColor = colorMode === 'dark' ? 'blueGray.700' : 'white'
	const color = colorMode === 'dark' ? 'white' : 'black'
	return (
		<FormControl style={props.style} isInvalid={Boolean(props.error?.type)}>
			<Controller
				control={props.control}
				name={props.name}
				rules={props.rules}
				render={({ field: { value, onChange, onBlur } }) => (
					<Input
						height={props.height ?? '24'}
						fontSize='sm'
						autoCorrect={false}
						autoCapitalize='none'
						value={value}
						onBlur={onBlur}
						onChangeText={onChange}
						isRequired={props.required}
						placeholder={props.placeholder}
						multiline
						variant={props.variant ?? 'filled'}
						bgColor={bgColor}
						color={color}
						borderColor='blueGray.500'
					/>
				)}
			/>
			<FormControl.ErrorMessage>{props.error?.message ?? 'Something is wrong.'}</FormControl.ErrorMessage>
		</FormControl>
	)
}
