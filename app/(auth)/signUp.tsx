import { type User } from '../../types/user'
import { useUser } from '../../hooks/useUser'
import { Link, useRouter } from 'expo-router'
import { type FirebaseError } from 'firebase/app'
import { useFetchNewUser } from '../../services/user'
import { Box, Button, Text, View } from 'native-base'
import { CustomInput } from '../../components/CustomInput'
import { LoginWith } from '../../components/auth/LoginWith'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { routes } from '../../utils/routes'

interface SignUpForm {
  name: string
  email: string
  password: string
}

export default function SignUp (): JSX.Element {
  const router = useRouter()
  const { setUser } = useUser()
  const { isLoading, mutateAsync } = useFetchNewUser()
  const {
    control,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpForm>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      const newUser: User = {
        uid: '',
        avatar: '',
        description: '',
        name: data.name,
        email: data.email
      }
      await mutateAsync({ user: newUser, password: data.password })
      reset()
      setUser(newUser)
      router.push(routes.setUser)
    } catch (e: unknown) {
      const error = e as FirebaseError

      if (error.code === 'auth/email-already-in-use') {
        setError('email', {
          type: 'manual',
          message: 'Email already in use'
        })
        setValue('password', '')
      }
    }
  }

  return (
    <View height='full' px='5' pt='20' pb='10' justifyContent='space-between' alignItems='flex-start' bg='blueGray.800'>
      <Box>
        <Text color='white' fontSize='2xl' fontWeight='bold' >
          Create Account
        </Text>
        <Text color='blueGray.400' fontSize='sm' >
          Connect with your friends Today!
        </Text>
        <Box mt='12'>
          <CustomInput
            name='name'
            rules={{
              required: {
                value: true,
                message: 'Name is required'
              }
            }}
            control={control}
            error={errors.name}
            placeholder='Enter your name'
            label='Name'
          />
          <CustomInput
           style={{ marginTop: 10 }}
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
            isLoading={isLoading}
              onTouchEnd={() => handleSubmit(onSubmit)().catch}
            >
              <Text fontWeight='bold' textAlign='center'>
                Sign Up
              </Text>
            </Button>
          </Box>
         <LoginWith />
        </Box>
      </Box>
      <Box>
        <Text marginTop='5' textAlign='center' color='white' fontSize='sm'>
          Already have an account?{' '}
          <Link href={routes.signIn}>
            <Text fontWeight='bold'> Sign In</Text>
          </Link>
        </Text>
      </Box>

    </View>
  )
}
