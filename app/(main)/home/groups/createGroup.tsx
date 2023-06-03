import { useRouter } from 'expo-router'
import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { routes } from '../../../../utils/routes'
import { useAppSelector } from '../../../../store'
import { type Group } from '../../../../types/Group'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { Header } from '../../../../components/shared/Header'
import { useFetchCreateGroup } from '../../../../services/groups'
import { UserCardInf } from '../../../../components/shared/UserCardInf'
import { CustomInput } from '../../../../components/shared/CustomInput'
import { getImageFromLibary } from '../../../../components/utils/getImage'
import { CustomTextArea } from '../../../../components/shared/CustomTextArea'
import { Avatar, Box, Button, FlatList, Image, Text, View } from 'native-base'
import { useI18n } from '../../../../i18n/usei18n'

interface Form {
	photoURL: string
	name: string
	description: string
	search: string
}

export default function CreateGroup(): JSX.Element {
	const {
		control,
		reset,
		setValue,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<Form>({
		defaultValues: {
			description: '',
			search: '',
			name: '',
			photoURL: ''
		}
	})
	const i18n = useI18n()
	const router = useRouter()
	const [usersToAdd, setUsersToAdd] = useState<string[]>([])
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)
	const { mutate, isSuccess, isError, error, isLoading } = useFetchCreateGroup()

	const usersFiltered = useMemo(
		() => users.filter((user) => user.name?.toLowerCase().includes(watch('search')?.toLowerCase())),
		[watch('search')]
	)

	const onSubmit = (data: Form) => {
		if (!user || isLoading) return

		const newGroup: Group = {
			id: '',
			name: data.name,
			description: data.description,
			avatar: data.photoURL,
			createdAt: new Date(),
			admins: [user?.uid],
			members: [user?.uid, ...usersToAdd],
			chat: [],
			events: []
		}

		mutate(newGroup)
	}

	const handleImageValue = async () => {
		const img = await getImageFromLibary()
		if (img) setValue('photoURL', img.uri)
	}

	useEffect(() => {
		if (isSuccess) {
			router.push(routes.home)
			reset()
		} else if (isError) {
			console.error(error)
		}
	}, [isSuccess])

	return (
		<View>
			<Header
				primaryText={i18n?.group.create.title ?? ''}
				secondaryText={i18n?.group.create.title_description ?? ''}
				route={routes.home}
			/>

			<Box mt='5' flexDir='row' alignItems='center' justifyContent='space-between'>
				<Box width='1/5'>
					<TouchableOpacity
						onPress={() => {
							handleImageValue()
						}}
					>
						<Avatar bgColor='blueGray.600' size='lg'>
							{watch('photoURL') ? (
								<Image
									width={'full'}
									height={'full'}
									borderRadius='full'
									source={{ uri: watch('photoURL') }}
									alt='Profile picture'
								/>
							) : (
								<AntDesign name='user' size={34} color='white' />
							)}
							<Avatar.Badge bg='blueGray.300' alignItems='center' justifyContent='center'>
								<Ionicons name='ios-cloud-upload-outline' size={15} color='gray' />
							</Avatar.Badge>
						</Avatar>
					</TouchableOpacity>
				</Box>
				<Box width='3/4'>
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
						placeholder='Group #1...'
						label={i18n?.group.form.name ?? ''}
					/>
				</Box>
			</Box>
			<Box mt='10'>
				<CustomTextArea
					control={control}
					name='description'
					placeholder={i18n?.group.form.description ?? ''}
					required={false}
					error={errors.description}
				/>
			</Box>
			<Text w='full' mt='5' fontSize='md' color='white'>
				{i18n?.group.form.participants}:
			</Text>
			<CustomInput control={control} name='search' label='' placeholder={i18n?.group.form.search ?? ''} />
			<FlatList
				mt='5'
				data={usersFiltered}
				maxH={`${users.length * 66 < 300 ? users.length * 66 : 300}px`}
				renderItem={({ item: contact }) => {
					const isAdded = usersToAdd.includes(contact.uid)
					return (
						<>
							<UserCardInf
								key={contact.uid}
								contact={contact}
								userId={user?.uid}
								addToGroup={
									isAdded
										? undefined
										: () => {
												setUsersToAdd([...usersToAdd, contact.uid])
										  }
								}
								removeFromGroup={
									isAdded
										? () => {
												setUsersToAdd(usersToAdd.filter((id) => id !== contact.uid))
										  }
										: undefined
								}
								isContact={undefined}
							/>
						</>
					)
				}}
			/>
			<Text mt='0' fontSize='xs' textAlign='left' width='full' color='blueGray.500'>
				{usersToAdd.length} {i18n.group.form.particpantsAdded}
			</Text>
			<Button mt='10' isLoading={isLoading} onTouchEnd={() => handleSubmit(onSubmit)()}>
				<Text fontWeight='bold' textAlign='center' color='white'>
					{i18n?.group.create.submit}
				</Text>
			</Button>
		</View>
	)
}
