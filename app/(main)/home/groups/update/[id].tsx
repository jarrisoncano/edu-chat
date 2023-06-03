import { useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import { routes } from '../../../../../utils/routes'
import { useAppSelector } from '../../../../../store'
import { type Group } from '../../../../../types/Group'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Header } from '../../../../../components/shared/Header'
import { useFetchUpdateGroup } from '../../../../../services/groups'
import { CustomInput } from '../../../../../components/shared/CustomInput'
import { UserCardInf } from '../../../../../components/shared/UserCardInf'
import { getImageFromLibary } from '../../../../../components/utils/getImage'
import { Avatar, Box, Button, Image, ScrollView, Text, View } from 'native-base'
import { CustomTextArea } from '../../../../../components/shared/CustomTextArea'
import { useI18n } from '../../../../../i18n/usei18n'

interface Form {
	photoURL: string
	name: string
	description: string
	search: string
}

export default function UpdateGroup(): JSX.Element {
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
			name: '',
			photoURL: '',
			search: ''
		}
	})
	const i18n = useI18n()
	const { id: groupId } = useLocalSearchParams()
	const groups = useAppSelector((state) => state.groupsSlice.groups)
	const group = groups.find((group) => group.id === groupId)

	const router = useRouter()
	const user = useAppSelector((state) => state.userSlice.user)
	const [usersToAdd, setUsersToAdd] = useState<string[]>([])
	const users = useAppSelector((state) => state.userSlice.users)
	const { mutate, isSuccess, isError, error, isLoading } = useFetchUpdateGroup()

	const usersSorted = useMemo(
		() => [...users].sort((a) => (usersToAdd.includes(a.uid) ? -1 : 1)),
		[users, usersToAdd]
	)

	const usersFiltered = useMemo(
		() => usersSorted.filter((user) => user.name?.toLowerCase().includes(watch('search')?.toLowerCase())),
		[watch('search')]
	)

	const onSubmit = (data: Form) => {
		if (!user || !group || isLoading) return

		const updateGroup: Group = {
			...group,
			name: data.name,
			avatar: data.photoURL,
			description: data.description,
			members: [user?.uid, ...usersToAdd]
		}

		mutate(updateGroup)
	}

	const handleImageValue = async () => {
		const img = await getImageFromLibary()
		if (img) setValue('photoURL', img.uri)
	}

	useEffect(() => {
		if (group && user) {
			setValue('name', group.name)
			setValue('description', group.description)
			setValue('photoURL', group.avatar)
			setUsersToAdd(group.members.filter((member) => member !== user.uid))
		}
	}, [group, user])

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
				primaryText={i18n.group.update.title}
				secondaryText={i18n.group.update.title_description}
				route={routes.home}
			/>
			<Box mt='2' flexDir='row' alignItems='center' justifyContent='space-between'>
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
						label={i18n.group.form.name}
					/>
				</Box>
			</Box>
			<Box mt='10'>
				<CustomTextArea
					control={control}
					name='description'
					placeholder={i18n.group.form.description}
					required={false}
					error={errors.description}
				/>
			</Box>
			<Text w='full' mt='5' fontSize='md' color='white'>
				{i18n.group.form.admin}:
			</Text>
			<Box mt='2'>
				<UserCardInf
					userId={user?.uid}
					contact={user as any}
					addToGroup={undefined}
					isContact={undefined}
					removeFromGroup={() => {}}
				/>
			</Box>

			<Text w='full' mt='5' fontSize='md' color='white'>
				{i18n.group.form.participants}:
			</Text>
			<CustomInput control={control} name='search' label='' placeholder={i18n.group.form.search} />
			<ScrollView mt='5' maxH={`${users.length * 66 < 300 ? users.length * 66 : 300}px`}>
				{usersFiltered.map((contact) => {
					const isAdded = usersToAdd.includes(contact.uid)
					return (
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
					)
				})}
			</ScrollView>
			<Text fontSize='xs' textAlign='left' width='full' color='blueGray.500'>
				{usersToAdd.length} {i18n.group.form.particpantsAdded}
			</Text>
			<Button mt='10' isLoading={isLoading} onTouchEnd={() => handleSubmit(onSubmit)()}>
				<Text fontWeight='bold' textAlign='center' color='white'>
					{i18n.group.update.submit}
				</Text>
			</Button>
		</View>
	)
}
