import { type User } from '../types/user'
import { doc, setDoc } from 'firebase/firestore'
import { useMutation } from '@tanstack/react-query'
import { auth, database } from '../config/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

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
  await setDoc(doc(database, 'users', newAuthUser.user.uid), newUser)
  return newUser
}

export const useFetchNewUser = () => useMutation((data: NewUserType) => fetchNewUser(data), {})
