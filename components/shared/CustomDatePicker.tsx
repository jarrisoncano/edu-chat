import { FC } from 'react'
import { Box, Text, useColorMode } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker'

interface Props {
	placeholder: string
	value: Date
	minimumDate?: Date
	onChange: (event: any, date: any) => void
}

export const CustomDatePicker: FC<Props> = (props) => {
	const { colorMode } = useColorMode()
	const color = colorMode === 'dark' ? 'white' : 'black'
	const bgColor = colorMode === 'dark' ? 'blueGray.700' : 'white'

	return (
		<Box>
			<Text fontSize='sm' fontWeight='normal' mb='1' color='gray.500'>
				{props.placeholder}
			</Text>
			<Box
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				bg={bgColor}
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
					themeVariant={colorMode as any}
					onChange={(e, v) => props.onChange(e, v)}
				/>
			</Box>
		</Box>
	)
}
