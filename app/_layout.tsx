import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { customTheme } from '../utils/customTheme'
import { Slot, SplashScreen, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export default function RootLayout (): JSX.Element | null {
  const [firstTime, setFirstTime] = useState(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    ;(async () => {
      const value = await AsyncStorage.getItem('@firstTime')

      if (value === null || value === 'true') {
        await AsyncStorage.setItem('@firstTime', 'true')
        setFirstTime(true)
      }
      setShowSplashScreen(false)
    })().catch((e) => {})
  }, [])

  return (
    <>
    <StatusBar style='light' />
      {
        showSplashScreen ? <SplashScreen /> : <RootLayoutNav firstTime={firstTime} />
      }
    </>
  )
}

interface Props {
  firstTime: boolean
}

function RootLayoutNav ({ firstTime }: Props): JSX.Element {
  const router = useRouter()
  console.log(firstTime)
  useEffect(() => {
    if (firstTime) router.push('/onboarding')
    else router.push('/signIn')
  }, [])

  return (
    <>
      <NativeBaseProvider theme={customTheme} >
        <Slot />
      </NativeBaseProvider>
    </>
  )
}
