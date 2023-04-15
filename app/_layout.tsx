import { useEffect } from 'react'
import { NativeBaseProvider } from 'native-base'
import { Slot, SplashScreen, useRouter } from 'expo-router'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export default function RootLayout (): JSX.Element | null {
  return (
   <RootLayoutNav />
  )
}

function RootLayoutNav (): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    router.push('/signIn')
  }, [])

  return (
    <>
      <NativeBaseProvider >
        <Slot />
      </NativeBaseProvider>
    </>
  )
}
