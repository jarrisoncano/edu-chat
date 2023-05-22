import {
	Timestamp,
	Unsubscribe,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	query,
	updateDoc,
	where
} from 'firebase/firestore'
import { Event, type Group } from '../types/Group'
import { useMutation } from '@tanstack/react-query'
import { COLLECTIONS } from '../utils/firebaseConsts'
import { useAppDispatch, useAppSelector } from '../store'
import { database, storage } from '../config/firebaseConfig'
import { handleAddGroups } from '../store/groups/groupsSlice'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const fetchCreateGroup = async (group: Group): Promise<Group | undefined> => {
	try {
		const avatarUrl = group.avatar

		const newGroup: Group = {
			id: group.id,
			name: group.name,
			description: group.description,
			avatar: '',
			members: group.members,
			admins: group.admins,
			chat: group.chat,
			events: group.events,
			createdAt: group.createdAt
		}

		if (avatarUrl.search('firebasestorage') === -1 && avatarUrl !== '') {
			const avatarRef = ref(storage, `avatars/${newGroup.name}-${newGroup.createdAt.toJSON()}`)
			const img = await fetch(avatarUrl)
			const bytes = await img.blob()

			await uploadBytes(avatarRef, bytes, { contentType: 'image/jpeg' })
			const url = await getDownloadURL(avatarRef)
			newGroup.avatar = url
		}

		const docRef = await addDoc(collection(database, COLLECTIONS.GROUPS), {
			...newGroup,
			createdAt: Timestamp.fromDate(group.createdAt)
		})
		await updateDoc(doc(database, COLLECTIONS.GROUPS, docRef.id), {
			id: docRef.id
		})

		return newGroup
	} catch (e) {
		console.log(e)
	}
}
export const useFetchCreateGroup = () => {
	return useMutation(async (group: Group) => await fetchCreateGroup(group))
}
//
const fetchGetGroups = (userId: string, setGroups: Dispatch<SetStateAction<Group[]>>): Unsubscribe => {
	try {
		const q = query(collection(database, COLLECTIONS.GROUPS), where('members', 'array-contains', userId))

		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const groups: Group[] = []
			querySnapshot.forEach((doc) => {
				const group = { ...doc.data(), createdAt: doc.data().createdAt.toDate() } as Group
				groups.push(group)
			})
			setGroups(groups)
		})
		return unsubscribe
	} catch (e) {
		console.log(e)
		return () => {}
	}
}
export const useListenUserGroupsChanges = () => {
	const dispatch = useAppDispatch()
	const [groups, setGroups] = useState<Group[]>([])
	const user = useAppSelector((state) => state.userSlice.user)
	const userId = user?.uid ?? ''

	useEffect(() => {
		if (!userId) return
		const unsubscribe = fetchGetGroups(userId, setGroups)
		return () => {
			unsubscribe()
		}
	}, [userId])

	useEffect(() => {
		dispatch(handleAddGroups(groups))
	}, [groups])
}
//
const deleteGroup = async (userId: string, groupId: string) => {
	try {
		const docRef = doc(database, COLLECTIONS.GROUPS, groupId)
		const group = await getDoc(docRef)

		if (group.exists()) {
			const groupData = group.data()
			const userIsAdmin = groupData.admins.includes(userId)
			if (!userIsAdmin) return

			await deleteDoc(doc(database, COLLECTIONS.GROUPS, groupId))
		}
	} catch (e) {
		console.log(e)
	}
}
export const useFetchDeleteGroup = () => {
	const user = useAppSelector((state) => state.userSlice.user)
	const userId = user?.uid ?? ''

	return useMutation(async (groupId: string) => await deleteGroup(userId, groupId))
}
//
const updateGroup = async (group: Group) => {
	try {
		if (group.avatar.search('firebasestorage') === -1 && group.avatar !== '') {
			const avatarRef = ref(storage, `avatars/${group.name}-${group.createdAt.toJSON()}`)
			const img = await fetch(group.avatar)
			const bytes = await img.blob()

			await uploadBytes(avatarRef, bytes, { contentType: 'image/jpeg' })
			const url = await getDownloadURL(avatarRef)
			group.avatar = url
		}

		const docRef = doc(database, COLLECTIONS.GROUPS, group.id)
		await updateDoc(docRef, {
			name: group.name,
			description: group.description,
			avatar: group.avatar,
			members: group.members
		})
	} catch (e) {
		console.log(e)
	}
}
export const useFetchUpdateGroup = () => {
	return useMutation(async (group: Group) => await updateGroup(group))
}
//
const fetchNewEvent = async (groupId: string, event: Event) => {
	try {
		const docRef = doc(database, COLLECTIONS.GROUPS, groupId)
		await updateDoc(docRef, {
			events: arrayUnion(event)
		})
	} catch (e) {
		console.log(e)
	}
}
export const useFetchNewEvent = () =>
	useMutation(async (data: { groupId: string; event: Event }) => await fetchNewEvent(data.groupId, data.event))
//
const fetchDeleteEvent = async (groupId: string, eventId: string) => {
	try {
		const docRef = doc(database, COLLECTIONS.GROUPS, groupId)
		const group = await getDoc(docRef)
		if (!group.exists()) return

		const newEvents = group.data()?.events.filter((e: Event) => e.id !== eventId)

		await updateDoc(docRef, {
			events: newEvents
		})
	} catch (e) {
		console.log(e)
	}
}
export const useFetchDeleteEvent = () => {
	return useMutation(
		async (data: { groupId: string; eventId: string }) => await fetchDeleteEvent(data.groupId, data.eventId)
	)
}
//
const fetchUpdateEvent = async (groupId: string, event: Event) => {
	try {
		const docRef = doc(database, COLLECTIONS.GROUPS, groupId)
		const group = await getDoc(docRef)
		if (!group.exists()) return

		const newEvents = group.data()?.events.filter((e: Event) => e.id !== event.id)

		await updateDoc(docRef, {
			events: [...newEvents, event]
		})
	} catch (e) {
		console.log(e)
	}
}
export const useFetchUpdateEvent = () => {
	return useMutation(
		async (data: { groupId: string; event: Event }) => await fetchUpdateEvent(data.groupId, data.event)
	)
}
//
const fetchLeaveGroup = (groupId: string, userId: string) => {
	try {
		const docRef = doc(database, COLLECTIONS.GROUPS, groupId)
		updateDoc(docRef, {
			members: arrayRemove(userId)
		})
	} catch (e) {
		console.log(e)
	}
}
export const useFetchLeaveGroup = () =>
	useMutation(async (data: { groupId: string; userId: string }) => fetchLeaveGroup(data.groupId, data.userId))
