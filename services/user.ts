import { type User } from '../types/user'
import { useMutation } from '@tanstack/react-query'
import { COLLECTIONS } from '../utils/firebaseConsts'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, database, storage } from '../config/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface NewUserType {
  user: User
  password: string
}

// TODO: type correctly
const fetchNewUser: any = async ({ user, password }: NewUserType) => {
  const newAuthUser = await createUserWithEmailAndPassword(auth, user.email, password)

  const newUser: User = {
    uid: newAuthUser.user.uid,
    name: user.name,
    email: user.email,
    avatar: '',
    description: ''
  }
  await setDoc(doc(database, COLLECTIONS.USERS, newAuthUser.user.uid), newUser)
  return newUser
}
export const useFetchNewUser = () => useMutation((data: NewUserType) => fetchNewUser(data), {})

const fetchUpdateUser = async (user: User): Promise<User | undefined> => {
  try {
    let avatarUrl = user.avatar

    if (avatarUrl.search('firebasestorage') === -1 && avatarUrl !== '') {
      const avatarRef = ref(storage, `avatars/${user.uid}`)
      const img = await fetch(avatarUrl)
      const bytes = await img.blob()

      await uploadBytes(avatarRef, bytes, { contentType: 'image/jpeg' })
      const url = await getDownloadURL(avatarRef)
      avatarUrl = url
    }

    await updateDoc(doc(database, COLLECTIONS.USERS, user.uid), {
      name: user.name,
      avatar: avatarUrl,
      description: user.description
    })
    return user
  } catch (e) {
    console.log(e)
  }
}
export const useFetchUpdateUser = () => useMutation(async (user: User) => await fetchUpdateUser(user), {})
