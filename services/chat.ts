import { useAppSelector } from '../store'
import { type Message } from '../types/Group'
import { useMutation } from '@tanstack/react-query'
import { database, storage } from '../config/firebaseConfig'
import { COLLECTIONS } from '../utils/firebaseConsts'
import { doc, getDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

//
interface FetchMessageInterface {
	groupId: string
	message: string
	userId: string
	image: string
}
const fetchMessage = async ({ groupId, message, userId, image }: FetchMessageInterface): Promise<undefined> => {
	try {
		let newMessage: Message = {
			userId,
			content: message,
			image: image ?? '',
			createdAt: Timestamp.now(),
			status: {
				delivered: [userId],
				read: [userId]
			}
		}

		if (image.length > 0) {
			const avatarRef = ref(storage, `${userId}/image-${Date.now()}`)
			const img = await fetch(image)
			const bytes = await img.blob()

			await uploadBytes(avatarRef, bytes, { contentType: 'image/jpeg' })
			const url = await getDownloadURL(avatarRef)
			newMessage.image = url
		}

		const docRef = doc(database, COLLECTIONS.GROUPS, groupId)
		await updateDoc(docRef, {
			chat: arrayUnion(newMessage)
		})
		return
	} catch (e) {
		console.log(e)
	}
}
export const useFetchMessage = () => {
	const user = useAppSelector((state) => state.userSlice.user)
	const userId = user?.uid ?? ''
	return useMutation(
		async (data: { message: string; groupId: string; image: string }) =>
			await fetchMessage({ groupId: data.groupId, message: data.message, userId, image: data.image })
	)
}
//
const fetchReadMessages = async (groupId: string, userId: string) => {
	try {
		const docRef = doc(database, COLLECTIONS.GROUPS, groupId)
		const group = await getDoc(docRef)
		if (group.exists()) {
			const chat = group.data().chat
			const unReadMessages = chat.filter((message: Message) => !message.status.read.includes(userId))
			const readMessages = unReadMessages.map((message: Message) => ({
				...message,
				status: {
					...message.status,
					read: [...message.status.read, userId]
				}
			}))

			await updateDoc(docRef, {
				chat: [...chat.filter((message: Message) => message.status.read.includes(userId)), ...readMessages]
			})
		}
	} catch (e) {
		console.log(e)
	}
}
export const useFetchReadMessages = () => {
	const user = useAppSelector((state) => state.userSlice.user)
	const userId = user?.uid ?? ''

	return useMutation(async (data: { groupId: string }) => await fetchReadMessages(data.groupId, userId))
}
