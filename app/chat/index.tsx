import { signOut } from 'firebase/auth'
import { useRouter } from 'expo-router'
import { routes } from '../../utils/routes'
import { Button, Text, View } from 'native-base'
import { auth } from '../../config/firebaseConfig'

export default function Chat (): JSX.Element {
  const router = useRouter()
  return (
        <View>
            <Text>Chat</Text>
            <Button width='20' onTouchEnd={() => {
              signOut(auth).catch((e) => { })
              router.push(routes.setUser)
            }}>
               config user
            </Button>
            <Button width='20' onTouchEnd={() => {
              signOut(auth).catch((e) => { })
              router.push(routes.signIn)
            }}>
                Log out
            </Button>
        </View>
  )
}
