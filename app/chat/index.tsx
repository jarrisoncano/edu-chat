import { signOut } from 'firebase/auth'
import { Button, Text, View } from 'native-base'
import { auth } from '../../config/firebaseConfig'
import { useRouter } from 'expo-router'

export default function Chat (): JSX.Element {
  const router = useRouter()
  return (
        <View>
            <Text>Chat</Text>
            <Button width='20' onTouchEnd={() => {
              signOut(auth).catch((e) => { })
              router.push('/signIn')
            }}>
                Log out
            </Button>
        </View>
  )
}
