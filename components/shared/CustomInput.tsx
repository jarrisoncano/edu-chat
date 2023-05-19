import { FormControl, Input } from 'native-base'
import { type StyleProp, type ViewStyle } from 'react-native'
import { type ResponsiveValue } from 'native-base/lib/typescript/components/types'
import { Controller, type ErrorOption, type RegisterOptions } from 'react-hook-form'

interface InputProps {
	name: string
	control: any
	label: string
	required?: boolean
	placeholder: string
	style?: StyleProp<ViewStyle>
	height?: ResponsiveValue<number | string>
	rules?: RegisterOptions
	error?: ErrorOption
	backgroundColor?: string
	type?: 'text' | 'password'
	variant?: 'filled' | 'outline' | 'unstyled' | 'underlined' | 'rounded'
}

export const CustomInput = (props: InputProps): JSX.Element => {
	return (
		<FormControl style={props.style} isInvalid={Boolean(props.error?.type)} height={props.height}>
			<FormControl.Label m={'0'} h={props.label ? '6' : 0}>
				{props.label}
			</FormControl.Label>
			<Controller
				control={props.control}
				name={props.name}
				rules={props.rules}
				render={({ field: { value, onChange, onBlur } }) => (
					<Input
						height={props.height}
						fontSize='sm'
						autoCorrect={false}
						autoCapitalize='none'
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						isRequired={props.required}
						autoComplete='email'
						type={props.type ?? 'text'}
						placeholder={props.placeholder}
						variant={props.variant ?? 'filled'}
						bgColor={props.backgroundColor ?? 'blueGray.700'}
						color='white'
						borderColor='blueGray.500'
					/>
				)}
			/>
			<FormControl.ErrorMessage>{props.error?.message ?? 'Something is wrong.'}</FormControl.ErrorMessage>
		</FormControl>
	)
}
