import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { routes } from '../../../utils/routes'
import { useAppSelector } from '../../../store'
import { type Event } from '../../../types/Group'
import { useEffect, useMemo, useState } from 'react'
import { Button, Text, VStack, View } from 'native-base'
import { Header } from '../../../components/shared/Header'
import { useFetchNewEvent } from '../../../services/groups'
import { CustomInput } from '../../../components/shared/CustomInput'
import { CustomSelect } from '../../../components/shared/CustomSelect'
import { ColorType } from 'native-base/lib/typescript/components/types'
import { CustomTextArea } from '../../../components/shared/CustomTextArea'
import { CustomDatePicker } from '../../../components/shared/CustomDatePicker'

const colorOptions: Array<{ label: string; value: ColorType }> = [
	{ label: 'Red', value: 'red.400' },
	{ label: 'Blue', value: 'blue.400' },
	{ label: 'Green', value: 'green.400' },
	{ label: 'Yellow', value: 'yellow.400' },
	{ label: 'Purple', value: 'purple.400' }
]

interface Form {
	groupId: string
	name: string
	description: string
	color: string
}

export default function CreateEvent() {
	const {
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<Form>({
		defaultValues: {
			description: '',
			groupId: '',
			name: '',
			color: 'blue.400'
		}
	})
	const router = useRouter()
	const [date, setDate] = useState({
		start: new Date(),
		end: new Date()
	})
	const user = useAppSelector((state) => state.userSlice.user)
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const { mutate, isSuccess, isError, error, isLoading } = useFetchNewEvent()

	const groupsFiltered = useMemo(
		() => groups.filter((group) => group.admins.includes(user?.uid || '')),
		[groups, user]
	)

	const onChange = (type: 'start' | 'end') => (_: any, selectedDate: any) => {
		const currentDate = selectedDate
		if (type === 'start' && date.end < currentDate) {
			setDate({ ...date, start: currentDate, end: currentDate })
		} else {
			setDate({ ...date, [type]: currentDate })
		}
	}
	const onSubmit = (data: Form) => {
		if (!user || !data.groupId) return

		const newEvent: Event = {
			id: uuidv4(),
			userId: user.uid,
			title: data.name,
			color: data.color,
			description: data.description,
			startDate: date.start,
			endDate: date.end,
			createdAt: new Date()
		}

		mutate({
			groupId: data.groupId,
			event: newEvent
		})
	}

	useEffect(() => {
		if (isSuccess) {
			router.push(routes.events)
			reset()
		} else if (isError) {
			console.error(error)
		}
	}, [isSuccess])

	return (
		<View>
			<Header
				primaryText='Create a event ➕'
				secondaryText={'Create a event to share with your team!'}
				route={routes.events}
			/>

			<VStack mt='5' space={5}>
				<CustomSelect
					control={control}
					name='groupId'
					placeholder='Group...'
					rules={{
						required: {
							value: true,
							message: 'Select a group to send the event to'
						}
					}}
					label='Select a group'
					error={errors.groupId}
					options={groupsFiltered.map((contact) => ({
						label: contact.name,
						value: contact.id
					}))}
				/>
				<CustomInput
					name='name'
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Name is required'
						}
					}}
					error={errors.name}
					type='text'
					placeholder='send assigment to...'
					label='Event name'
				/>
				<CustomTextArea
					control={control}
					name='description'
					placeholder='Description...'
					required={false}
					error={errors.description}
				/>
				<CustomDatePicker placeholder='Start date' value={date.start} onChange={onChange('start')} />
				<CustomDatePicker
					placeholder='End date'
					minimumDate={date.start}
					value={date.end}
					onChange={onChange('end')}
				/>

				<CustomSelect
					control={control}
					backgroundColor={watch('color')}
					name='color'
					placeholder='Color...'
					label='Color'
					options={colorOptions}
				/>
			</VStack>

			<Button mt='10' isLoading={isLoading} onTouchEnd={() => handleSubmit(onSubmit)()}>
				<Text fontWeight='bold' textAlign='center'>
					Create event
				</Text>
			</Button>
		</View>
	)
}
