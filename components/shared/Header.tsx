import React, { type FC } from 'react'
import { Box, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

interface Props {
  primaryText: string
  secondaryText: string
  route: string
}
export const Header: FC<Props> = (props) => {
  const router = useRouter()
  return (
    <Box flexDirection='row' justifyContent='space-between'>
      <Box width='2/3'>
        <Text color='white' fontSize='2xl' fontWeight='bold'>
          {props.primaryText}
        </Text>
        <Text color='blueGray.400' fontSize='sm'>
          {props.secondaryText}
        </Text>
      </Box>
      <Box width='25px'>
        <TouchableOpacity
          onPress={() => {
            router.push(props.route)
          }}
        >
          <Ionicons name='ios-close' size={25} color='white' />
        </TouchableOpacity>
      </Box>
    </Box>

  )
}
