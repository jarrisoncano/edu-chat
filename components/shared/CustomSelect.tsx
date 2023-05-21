import { type StyleProp, type ViewStyle } from 'react-native'
import { Box, CheckIcon, FormControl, Select } from 'native-base'
import { type ResponsiveValue } from 'native-base/lib/typescript/components/types'
import { Controller, type ErrorOption, type RegisterOptions } from 'react-hook-form'

interface InputProps {
	name: string
	control: any
	label: string
	required?: boolean
	options: Array<{ label: string; value: any }>
	placeholder: string
	isDisabled?: boolean
	style?: StyleProp<ViewStyle>
	height?: ResponsiveValue<number | string>
	rules?: RegisterOptions
	error?: ErrorOption
	backgroundColor?: string
}

export const CustomSelect = (props: InputProps): JSX.Element => {
	return (
		<FormControl
			isDisabled={props.isDisabled}
			style={props.style}
			isInvalid={Boolean(props.error?.type)}
			height={props.height}
		>
			<FormControl.Label m={'0'} h={props.label ? '6' : 0}>
				{props.label}
			</FormControl.Label>
			<Controller
				control={props.control}
				name={props.name}
				rules={props.rules}
				render={({ field: { value, onChange } }) => (
					<Box position='relative'>
						<Box
							pointerEvents='none'
							w='full'
							h={props.height ?? 9}
							justifyContent='center'
							pl={3}
							zIndex='1'
							bottom='0'
							position='absolute'
						>
							{props.options.find((option) => option.value === value)?.label ?? ''}
						</Box>
						<Select
							mt={1}
							isDisabled={props.isDisabled}
							selectedValue={value}
							lineHeight={1}
							accessibilityLabel={props.placeholder}
							placeholder={props.placeholder}
							onValueChange={(itemValue) => {
								const event = {
									target: {
										name: props.name,
										value: itemValue
									}
								}
								onChange(event)
							}}
							_selectedItem={{
								bg: 'blueGray.300',
								endIcon: <CheckIcon size={5} />
							}}
							bgColor={props.backgroundColor ?? 'blueGray.700'}
							color='white'
							borderColor='blueGray.500'
							w='full'
							h={props.height ?? 9}
						>
							{props.options.map((option) => (
								<Select.Item key={option.value} label={option.label} value={option.value} />
							))}
						</Select>
					</Box>
				)}
			/>
			<FormControl.ErrorMessage>{props.error?.message ?? 'Something is wrong.'}</FormControl.ErrorMessage>
		</FormControl>
	)
}
