import { Slot } from 'expo-router'
import { MenuBar } from '../../components/shared/MenuBar'

export default function MainLayout () {
  return (
        <>
            <Slot />
            <MenuBar />
        </>
  )
}
