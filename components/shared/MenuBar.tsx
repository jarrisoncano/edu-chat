import { usePathname, useRouter } from 'expo-router'
import { routes } from '../../utils/routes'
import { Box, Flex, Text } from 'native-base'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export const MenuBar = (): JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()

  const screens = [
    {
      name: 'Chats',
      icon: <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" />,
      route: routes.home
    },
    {
      name: 'Events',
      icon: <MaterialIcons name="event" size={24} color="white" />,
      route: routes.events
    },
    {
      name: 'Settings',
      icon: <Feather name="settings" size={24} color="white" />,
      route: routes.settings
    }
  ]

  return (
        <Box px='12' pb='5' pt='3' bg='blueGray.900' flexDir='row' alignItems='center' justifyContent='space-between'>
            {
                screens.map((screen) => (
                    <TouchableOpacity key={screen.route} onPress={() => { router.push(screen.route) }}>
                        <Flex justifyContent='center' width='16' height='16' p='1' borderRadius='full' alignItems='center' bg={screen.route === pathname ? 'blueGray.800' : 'initial'}>
                            <screen.icon.type {...screen.icon.props} color={screen.route === pathname ? '#64748b' : 'white'} />
                            <Text fontSize='xs' color={screen.route === pathname ? 'blueGray.500' : 'white'} fontWeight={screen.route === pathname ? 'bold' : 'normal'}>
                                {screen.name}
                            </Text>
                        </Flex>
                    </TouchableOpacity>
                ))
            }
        </Box>
  )
}
