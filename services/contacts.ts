import { User } from '../types/user'
import { useAppSelector } from '../store'
import { database } from '../config/firebaseConfig'
import { COLLECTIONS } from '../utils/firebaseConsts'
import { useMutation, useQuery } from '@tanstack/react-query'
import { arrayRemove, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

const fetchAddContact = async (userId: string, contactId: string) => {
	try {
		await updateDoc(doc(database, COLLECTIONS.USERS, userId), {
			contacts: arrayUnion(contactId)
		})
		await updateDoc(doc(database, COLLECTIONS.USERS, contactId), {
			contacts: arrayUnion(userId)
		})
	} catch (e) {
		console.log(e)
	}
}
export const useFetchAddContact = () =>
	useMutation((data: { userId: string; contactId: string }) => fetchAddContact(data.userId, data.contactId))
//
const fetchRemoveContact = async (userId: string, contactId: string) => {
	try {
		await updateDoc(doc(database, COLLECTIONS.USERS, userId), {
			contacts: arrayRemove(contactId)
		})
		await updateDoc(doc(database, COLLECTIONS.USERS, contactId), {
			contacts: arrayRemove(userId)
		})
	} catch (e) {
		console.log(e)
	}
}
export const usefetchRemoveContact = () =>
	useMutation((data: { userId: string; contactId: string }) => fetchRemoveContact(data.userId, data.contactId))
