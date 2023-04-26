import { Link } from 'expo-router'
import { Box, Button, Text, View } from 'native-base'
import { routes } from '../../utils/routes'

export default function OnBoarding (): JSX.Element {
  return (

        <View py='20' alignItems='flex-start' justifyContent='flex-end' >
            <Text fontSize='6xl' fontWeight='extrabold' lineHeight='xs'>
                Let's get started
            </Text>
            <Text fontSize='xl' fontWeight='medium' mt='5' color='blueGray.400'>
                Connect with each other with chatting. Enjoy safe and private texting
            </Text>
            <Box mt='20'>
                <Button>
                    <Link href={routes.signUp}>
                        <Text fontWeight='bold' textAlign='center'>
                            Join Now
                        </Text>
                    </Link>
                </Button>
                <Text mt='8' textAlign='center'>
                    Already have an account? <Link href={routes.signIn}>
                        <Text fontWeight='bold'>Sign In</Text>
                    </Link>
                </Text>
            </Box>
        </View>
  )
}
