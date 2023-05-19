import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { routes } from '../../../utils/routes'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '../../../store'
import { type Group } from '../../../types/Group'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Header } from '../../../components/shared/Header'
import { useFetchCreateGroup } from '../../../services/chat'
import { CustomInput } from '../../../components/shared/CustomInput'
import { Avatar, Box, Button, Image, ScrollView, Text, View } from 'native-base'
import { getImageFromLibary } from '../../../components/utils/getImage'
import { CustomTextArea } from '../../../components/shared/CustomTextArea'
import { UserCardInf } from '../../../components/shared/UserCardInf'

interface Form {
	photoURL: string
	name: string
	description: string
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
			name: '',
			photoURL: ''
		}
	})
	const router = useRouter()
	const user = useAppSelector((state) => state.userSlice.user)
	const [contactsToAdd, setContactsToAdd] = useState<string[]>([])
	const contacts = useAppSelector((state) => state.userSlice.contacts)
	const { mutate, isSuccess, isError, error, isLoading } = useFetchCreateGroup()

	const onSubmit = (data: Form) => {
		if (!user) return

		const newGroup: Group = {
			id: '',
			name: data.name,
			description: data.description,
			avatar: data.photoURL,
			createdAt: new Date(),
			admins: [user?.uid],
			members: [user?.uid, ...contactsToAdd],
			chat: []
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
				primaryText='Create a group ➕'
				secondaryText={'Start to share with your friends'}
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
						label='Group Name'
					/>
				</Box>
			</Box>
			<Box mt='10'>
				<CustomTextArea
					control={control}
					name='description'
					placeholder='What is this group about?'
					required={false}
					error={errors.description}
				/>
			</Box>
			<Text w='full' mt='5' fontSize='md' color='white'>
				Add participants:
			</Text>
			<ScrollView mt='5' maxH={contacts.length * 20 < 200 ? contacts.length * 20 : 200}>
				{contacts.map((contact) => {
					const isAdded = contactsToAdd.includes(contact.uid)
					return (
						<UserCardInf
							key={contact.uid}
							contact={contact}
							userId={user?.uid}
							addToGroup={
								isAdded
									? undefined
									: () => {
											setContactsToAdd([...contactsToAdd, contact.uid])
									  }
							}
							removeFromGroup={
								isAdded
									? () => {
											setContactsToAdd(contactsToAdd.filter((id) => id !== contact.uid))
									  }
									: undefined
							}
							isContact={undefined}
						/>
					)
				})}
			</ScrollView>
			<Text mt='0' fontSize='xs' textAlign='left' width='full' color='blueGray.500'>
				{contactsToAdd.length} participants added
			</Text>
			<Button mt='10' isLoading={isLoading} onTouchEnd={() => handleSubmit(onSubmit)()}>
				<Text fontWeight='bold' textAlign='center'>
					Create group
				</Text>
			</Button>
		</View>
	)
}
