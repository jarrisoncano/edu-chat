import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Pressable, useColorScheme } from 'react-native'

import Colors from '../../constants/Colors'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon (props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}): JSX.Element {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout (): JSX.Element {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
      }}
    >
      <Tabs.Screen
        name='listOfchats'
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <TabBarIcon name='phone' color={color} />,
          headerRight: () => (
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name='user'
                  size={25}
                  color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          )
        }}
      />
      <Tabs.Screen
        name='calendar'
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <TabBarIcon name='calendar' color={color} />
        }}
      />
    </Tabs>
  )
}
