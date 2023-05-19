import { FC } from 'react'
import { useAssets } from 'expo-asset'
import { Entypo } from '@expo/vector-icons'
import { type Contact, type User } from '../../types/user'
import { Avatar, Box, Pressable, Spinner, Text, VStack } from 'native-base'
import { useFetchAddContact, usefetchRemoveContact } from '../../services/contacts'

interface Props {
	contact: Contact | User
	userId: string | undefined
	isContact?: boolean
	add?: boolean
	remove?: boolean
}

export const UserCardInf: FC<Props> = (props) => {
	const { contact } = props
	const fetchAddContact = useFetchAddContact()
	const fetchRemoveContact = usefetchRemoveContact()
	const [assets] = useAssets([require('../../assets/images/avatar.png')])
	const imageURI = contact.avatar ? contact.avatar : assets?.[0].localUri

	return (
		<Box flexDir='row' px='4' py='2' width='full' bg='coolGray.700' alignItems='center'>
			<Box width='1/6'>
				<Avatar
					size='md'
					source={{
						uri: imageURI ?? undefined
					}}
				/>
			</Box>
			<VStack ml='1' width='4/6'>
				<Text width='full' color='white' bold>
					{contact.name}
				</Text>
				<Text width='full' numberOfLines={1} color='white'>
					{contact.description}
				</Text>
			</VStack>
			<Box width='1/6'>
				{props.add && (
					<Pressable
						pr='2'
						width='full'
						alignItems='flex-end'
						onPress={() => {
							if (props.isContact || !props.userId) return

							fetchAddContact.mutate({
								userId: props.userId,
								contactId: contact.uid
							})
						}}
					>
						{fetchAddContact.isLoading && <Spinner color='indigo.500' />}
						{props.isContact && !fetchAddContact.isLoading && (
							<Entypo name='check' size={22} color='green' />
						)}
						{!props.isContact && !fetchAddContact.isLoading && (
							<Entypo name='add-user' size={22} color='white' />
						)}
					</Pressable>
				)}
				{props.remove && (
					<Pressable
						width='full'
						alignItems='flex-end'
						pr='2'
						onPress={() => {
							if (!props.userId) return

							fetchRemoveContact.mutate({
								userId: props.userId,
								contactId: contact.uid
							})
						}}
					>
						{fetchRemoveContact.isLoading && <Spinner color='indigo.500' />}
						<Entypo name='remove-user' size={22} color='red' />
					</Pressable>
				)}
			</Box>
		</Box>
	)
}
