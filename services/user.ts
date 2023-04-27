import { type User } from '../types/user'
import { useMutation } from '@tanstack/react-query'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, database, storage } from '../config/firebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const getBlobFroUri = async (uri: string) => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  return blob
}

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

const fetchUpdateUser: any = async (user: User) => {
  try {
    let avatarUrl = user.avatar

    if (avatarUrl.search('firebasestorage') !== -1) {
      const metadata = { contentType: 'image/jpeg' }
      const avatarRef = ref(storage, `avatars/${user.uid}`)

      const fileBlob = await getBlobFroUri(avatarUrl)
      await uploadBytes(avatarRef, fileBlob, metadata)
      avatarUrl = await getDownloadURL(avatarRef)
    }

    await updateDoc(doc(database, 'users', user.uid), {
      name: user.name,
      avatar: avatarUrl,
      description: user.description
    })
    return user
  } catch (e) {
    console.log(e)
  }
}
export const useFetchUpdateUser = () => useMutation((user: User) => fetchUpdateUser(user), {})
