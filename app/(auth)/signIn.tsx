import { routes } from '../../utils/routes'
import { Link, useRouter } from 'expo-router'
import { type FirebaseError } from 'firebase/app'
import { auth } from '../../config/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { LoginWith } from '../../components/auth/LoginWith'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Box, Button, Text, View, useToast } from 'native-base'
import { CustomInput } from '../../components/shared/CustomInput'

interface SignInForm {
  email: string
  password: string
}

export default function SignIn (): JSX.Element {
  const toast = useToast()
  const router = useRouter()
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
      router.push(routes.home)
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
    <View height='full' px='5' pt='20' pb='10' justifyContent='space-between' alignItems='flex-start' bg='blueGray.800'>
      <Box>
        <Text color='white' fontSize='2xl' fontWeight='bold' >
          Hello! Welcome back! 👋
        </Text>
        <Text color='blueGray.400' fontSize='sm' >
          Hello again, you've been missed!
        </Text>
        <Box mt='12'>
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
            placeholder='Enter your email'
            label='Email'
          />
          <CustomInput
            style={{ marginTop: 10 }}
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
            placeholder='Enter your password'
            label='Password'
          />
          <Box mt='12'>
            <Button
              onTouchEnd={() => handleSubmit(onSubmit)().catch}
            >
              <Text fontWeight='bold' textAlign='center'>
                Sign In
              </Text>
            </Button>
          </Box>
         <LoginWith />
        </Box>
      </Box>
      <Box>
        <Text marginTop='5' textAlign='center' color='white' fontSize='sm'>
          Don't have an account?{' '}
          <Link href={routes.signUp}>
            <Text fontWeight='bold'> Sign Up</Text>
          </Link>
        </Text>
      </Box>

    </View>
  )
}
