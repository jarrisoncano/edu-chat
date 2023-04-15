import { Link } from 'expo-router'
import { auth } from '../../config/firebaseConfig'
import { Box, Button, Text, View, useToast } from 'native-base'
import { CustomInput } from '../../components/CustomInput'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type FirebaseError } from 'firebase/app'

interface SignInForm {
  email: string
  password: string
}

export default function SignIn (): JSX.Element {
  const toast = useToast()
  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (e: unknown) {
      const error = e as FirebaseError

      if (error.code === 'auth/user-not-found') {
        setError('email', {
          type: 'manual',
          message: 'User not found'
        })
        setValue('password', '')
      } else if (error.code === 'auth/wrong-password') {
        setError('password', {
          type: 'manual',
          message: 'Wrong password'
        })
      } else {
        toast.show({
          title: 'Error',
          variant: 'error',
          description: error.code
        })
      }
    }
  }

  return (
    <View width='full' height='full' px='5' justifyContent='center' alignItems='center' bg='blueGray.800'>
      <CustomInput
        name='email'
        rules={{
          required: {
            value: true,
            message: 'Email is required'
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        control={control}
        error={errors.email}
        placeholder='Write your email...'
        label='Email'
      />
      <CustomInput
        name='password'
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required'
          },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Password must be at least 8 characters long and contain at least one letter and one number.'
          }
        }}
        error={errors.password}
        type='password'
        placeholder='Write your password...'
        label='Password'
      />
      <Box mt='5' width='full'>
        <Button
          onTouchEnd={() => handleSubmit(onSubmit)().catch}
        >
          <Text fontWeight='bold'>
            Sign In
          </Text>
        </Button>

        <Text marginTop='5' textAlign='center' color='white' fontSize='sm'>
          Not a member?{' '}
          <Link href='/signUp'>
            <Text fontWeight='bold'> Sign Up</Text>
          </Link>
        </Text>
      </Box>
    </View>
  )
}
