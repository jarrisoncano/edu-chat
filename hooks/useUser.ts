import { type User } from '../types/user'
import { useAppDispatch } from '../store'
import { handleSetUser } from '../store/user/userSlice'

export const useUser = () => {
  const dispatch = useAppDispatch()

  const setUser = (user: User) => {
    dispatch(handleSetUser(user))
  }

  return {
    setUser
  }
}
