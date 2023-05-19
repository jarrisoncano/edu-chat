import { FC } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { CustomAvatar } from './CustomAvatar'
import { type Contact, type User } from '../../types/user'
import { Box, Pressable, Spinner, Text, VStack } from 'native-base'
import { useFetchAddContact, usefetchRemoveContact } from '../../services/contacts'

interface Props {
	contact: Contact | User
	userId: string | undefined
	isContact?: boolean
	add?: boolean
	remove?: boolean
	addToGroup?: () => void
	removeFromGroup?: () => void
}

export const UserCardInf: FC<Props> = (props) => {
	const { contact } = props
	const fetchAddContact = useFetchAddContact()
	const fetchRemoveContact = usefetchRemoveContact()

	return (
		<Box flexDir='row' px='4' py='2' width='full' bg='coolGray.700' alignItems='center'>
			<Box width='1/6'>
				<CustomAvatar imageURI={contact.avatar} />
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
							<AntDesign name='check' size={24} color='#22c55e' />
						)}
						{!props.isContact && !fetchAddContact.isLoading && (
							<AntDesign name='adduser' size={24} color='white' />
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
						<AntDesign name='deleteuser' size={24} color='red' />
					</Pressable>
				)}
				{props.addToGroup && (
					<Pressable width='full' alignItems='flex-end' pr='2' onPress={props.addToGroup}>
						<AntDesign name='pluscircleo' size={24} color='white' />
					</Pressable>
				)}
				{props.removeFromGroup && (
					<Pressable width='full' alignItems='flex-end' pr='2' onPress={props.removeFromGroup}>
						<AntDesign name='pluscircle' size={24} color='#22c55e' />
					</Pressable>
				)}
			</Box>
		</Box>
	)
}
