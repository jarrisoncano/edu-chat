import { type Group } from '../types/Group'
import { useMutation } from '@tanstack/react-query'
import { COLLECTIONS } from '../utils/firebaseConsts'
import { useAppDispatch, useAppSelector } from '../store'
import { database, storage } from '../config/firebaseConfig'
import { handleAddGroups } from '../store/groups/groupsSlice'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Timestamp, Unsubscribe, addDoc, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

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
    return () => { }
  }
}
export const useListenUserGroupsChanges = () => {
  const dispatch = useAppDispatch()
  const [groups, setGroups] = useState<Group[]>([])
  const user = useAppSelector((state) => state.userSlice.user)
  const userId = user?.uid ?? ''

  useEffect(() => {
    const unsubscribe = fetchGetGroups(userId, setGroups)
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    dispatch(handleAddGroups(groups))
  }, [groups])


  // return useQuery({
  // 	queryKey: ['getGroups', userId],
  // 	queryFn: async () => await fetchGetGroups(userId)
  // })
}
