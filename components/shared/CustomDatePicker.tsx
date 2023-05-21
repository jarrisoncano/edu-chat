import { FC } from 'react'
import { Box, Text } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker'

interface Props {
	placeholder: string
	value: Date
	minimumDate?: Date
	onChange: (event: any, date: any) => void
}

export const CustomDatePicker: FC<Props> = (props) => {
	return (
		<Box>
			<Text fontSize='sm' fontWeight='normal' mb='1' color='gray.500'>
				{props.placeholder}
			</Text>
			<Box
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				bg={'blueGray.700'}
				h={9}
				borderWidth='1'
				pl='3'
				rounded='md'
				borderColor='blueGray.500'
			>
				<Text>{props.value.toDateString()}</Text>
				<DateTimePicker
					mode='date'
					collapsable
					minimumDate={props.minimumDate}
					value={props.value}
					themeVariant='dark'
					onChange={(e, v) => props.onChange(e, v)}
				/>
			</Box>
		</Box>
	)
}
