import { Link } from 'expo-router'
import { Box, Button, FormControl, Input, Text, View } from 'native-base'

export default function SignUp (): JSX.Element {
  return (
        <View width='full' height='full' px='5' justifyContent='center' alignItems='center' bg='blueGray.800'>
          <FormControl>
            <FormControl.Label>Email:</FormControl.Label>
            <Input placeholder="Write your Email" variant='filled' bgColor='blueGray.700' borderColor='blueGray.500' />
            <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password:</FormControl.Label>
            <Input placeholder="Write your Password" variant='filled' bgColor='blueGray.700' borderColor='blueGray.500' />
            <FormControl.ErrorMessage>Something is wrong.</FormControl.ErrorMessage>
          </FormControl>
          <Box mt='5' width='full'>
              <Button bgColor='violet.500' fontWeight='bold'>
                Sign Up
              </Button>
          <Text marginTop='5' textAlign='center' color='white' fontSize="sm">
          Already have an account? <Link href='/signIn'>
            <Text fontWeight='bold'> Sign In</Text>
          </Link>
          </Text>
          </Box>

        </View>
  )
}
