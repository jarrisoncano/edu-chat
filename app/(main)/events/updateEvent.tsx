import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { routes } from '../../../utils/routes'
import { useI18n } from '../../../i18n/usei18n'
import { Button, Text, VStack, View } from 'native-base'
import { Header } from '../../../components/shared/Header'
import { useFetchUpdateEvent } from '../../../services/groups'
import { useAppDispatch, useAppSelector } from '../../../store'
import { CustomInput } from '../../../components/shared/CustomInput'
import { type SelectedEvent, type Event } from '../../../types/Group'
import { CustomSelect } from '../../../components/shared/CustomSelect'
import { handleSelectedEvent } from '../../../store/events/eventsSlice'
import { CustomTextArea } from '../../../components/shared/CustomTextArea'
import { CustomDatePicker } from '../../../components/shared/CustomDatePicker'

interface Form {
	groupId: string
	name: string
	description: string
	color: string
}

export default function UpdateEvent() {
	const {
		control,
		reset,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<Form>({
		defaultValues: {
			groupId: '',
			name: '',
			description: '',
			color: 'blue.400'
		}
	})
	const i18n = useI18n()
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [date, setDate] = useState({
		start: new Date(),
		end: new Date()
	})
	const user = useAppSelector((state) => state.userSlice.user)
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const selectedEvent = useAppSelector((state) => state.eventsSlice.selectedEvent)
	const { mutate, isSuccess, isError, error, isLoading } = useFetchUpdateEvent()

	const changeSelectedEvent = (event: SelectedEvent | null) => {
		dispatch(handleSelectedEvent(event))
	}
	const onChange = (type: 'start' | 'end') => (_: any, selectedDate: any) => {
		const currentDate = selectedDate
		if (type === 'start' && date.end < currentDate) {
			setDate({ ...date, start: currentDate, end: currentDate })
		} else {
			setDate({ ...date, [type]: currentDate })
		}
	}
	const onSubmit = (data: Form) => {
		if (!user || !data.groupId || !selectedEvent) return

		const newEvent: Event = {
			id: selectedEvent.id,
			userId: user.uid,
			title: data.name,
			color: data.color,
			description: data.description,
			startDate: date.start,
			endDate: date.end,
			createdAt: selectedEvent.createdAt
		}

		mutate({
			groupId: data.groupId,
			event: newEvent
		})
	}

	useEffect(() => {
		if (selectedEvent) {
			const startDate = selectedEvent.startDate.toDate() as Date
			const endDate = selectedEvent.endDate.toDate() as Date

			setDate({
				start: startDate,
				end: endDate
			})
			reset({
				groupId: selectedEvent.groupId,
				name: selectedEvent.title,
				description: selectedEvent.description,
				color: selectedEvent.color
			})
		}
	}, [selectedEvent])

	useEffect(() => {
		if (isSuccess) {
			router.push(routes.events)
			changeSelectedEvent(null)
			reset()
		} else if (isError) {
			console.error(error)
		}
	}, [isSuccess])

	return (
		<View>
			<Header
				primaryText={i18n.events.update.title}
				secondaryText={i18n.events.update.title_description}
				route={routes.events}
			/>

			<VStack mt='5' space={5}>
				<CustomSelect
					isDisabled
					control={control}
					name='groupId'
					placeholder='Group...'
					rules={{
						required: {
							value: true,
							message: 'Select a group to send the event to'
						}
					}}
					label={i18n.events.form.groupId}
					error={errors.groupId}
					options={groups.map((contact) => ({
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
					placeholder='name...'
					label={i18n.events.form.name}
				/>
				<CustomTextArea
					control={control}
					name='description'
					placeholder={i18n.events.form.description}
					required={false}
					error={errors.description}
				/>
				<CustomDatePicker
					placeholder={i18n.events.form.startDate}
					value={date.start}
					onChange={onChange('start')}
				/>
				<CustomDatePicker
					placeholder={i18n.events.form.endDate}
					minimumDate={date.start}
					value={date.end}
					onChange={onChange('end')}
				/>

				<CustomSelect
					control={control}
					backgroundColor={watch('color')}
					name='color'
					placeholder='Color...'
					label={i18n.events.form.color}
					options={i18n.events.form.colors}
				/>
			</VStack>

			<Button mt='10' isLoading={isLoading} onTouchEnd={() => handleSubmit(onSubmit)()}>
				<Text fontWeight='bold' textAlign='center' color='white'>
					{i18n.events.update.submit}
				</Text>
			</Button>
		</View>
	)
}
