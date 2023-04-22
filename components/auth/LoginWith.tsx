import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { Box, Divider, Text } from 'native-base'

export const LoginWith = (): JSX.Element => {
  return (
        <>
            <Box mt='16' alignItems='center' justifyContent='center' flexDirection='row'>
                <Divider width='1/5' />
                <Text color='blueGray.400' fontSize='sm' mx='2'>
                    Or Login with
                </Text>
                <Divider width='1/5' />
            </Box>
            <TouchableOpacity>
                <Box py='2' borderRadius='sm' mt='12' alignItems='center' justifyContent='center' display='flex' flexDirection='row' background='white'>
                    <AntDesign name="google" size={20} color="black" />
                    <Text ml='2' color='black' flexDirection='row' alignItems='center'>
                        Google
                    </Text>
                </Box>
            </TouchableOpacity>
        </>
  )
}
