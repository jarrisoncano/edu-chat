import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { routes } from '../../../utils/routes'
import { useAppSelector } from '../../../store'
import { useUser } from '../../../hooks/useUser'
import { TouchableOpacity } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { Header } from '../../../components/shared/Header'
import { useFetchUpdateUser } from '../../../services/user'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Avatar, Box, Button, Image, Text, View } from 'native-base'
import { getImageFromLibary } from '../../../components/utils/getImage'
import { CustomTextArea } from '../../../components/shared/CustomTextArea'

interface Form {
  photoURL: string
  description: string
}

export default function SetUser() {
  const { setUser } = useUser()
  const router = useRouter()
  const user = useAppSelector((state) => state.userSlice.user)
  const { isSuccess, isLoading, mutate, data, isError, error } = useFetchUpdateUser()
  const {
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>({
    defaultValues: {
      description: '',
      photoURL: ''
    }
  })
  const firstTime = !user?.avatar || !user?.description
  const secondaryText = firstTime ? 'Complete your profile' : 'Update your profile'

  const handleImage = async () => {
    const img = await getImageFromLibary()
    if (img != null) setValue('photoURL', img.uri)
  }

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { photoURL, description } = data
    if (user == null || !user.uid) return

    mutate({ ...user, avatar: photoURL, description })
  }

  useEffect(() => {
    if (isSuccess && (data != null)) {
      router.push(routes.home)
      setUser(data)
      reset()
    } else if (isError) {
      console.error(error)
    }
  }, [isSuccess])

  useEffect(() => {
    if (user?.description) setValue('description', user?.description)
    if (user?.avatar) setValue('photoURL', user?.avatar)
  }, [user])

  return (
    <View pt='20' justifyContent='flex-start'>
      <Header primaryText='Profile Settings 🛠' secondaryText={secondaryText} route={routes.home} />
      <Box mt='12' alignItems='center'>
        <TouchableOpacity
          onPress={() => {
            handleImage().catch(() => { })
          }}
        >
          <Avatar bgColor='blueGray.600' size='2xl'>
            {watch('photoURL')
              ? (
                <Image
                  width='full'
                  height='full'
                  borderRadius='full'
                  source={{ uri: watch('photoURL') }}
                  alt='Profile picture'
                />
              )
              : (
                <AntDesign name='user' size={34} color='white' />
              )}
            <Avatar.Badge bg='blueGray.300' alignItems='center' justifyContent='center'>
              <Ionicons name='ios-cloud-upload-outline' size={15} color='gray' />
            </Avatar.Badge>
          </Avatar>
        </TouchableOpacity>
        <Text pt='5' fontSize='2xl' fontWeight='bold'>
          {user?.name}
        </Text>
        <Text fontSize='md' fontWeight='thin'>
          {user?.email}
        </Text>
      </Box>
      <Box pt='12' alignItems='center'>
        <CustomTextArea
          control={control}
          name='description'
          placeholder='Tell us about yourself'
          height={150}
          required={false}
          error={errors.description}
        />
        <Box alignItems='flex-end'>
          <Text fontWeight='semibold' fontSize='xs'>
            {watch('description').length}/100
          </Text>
        </Box>
      </Box>
      <Button mt='10' isLoading={isLoading} onTouchEnd={() => handleSubmit(onSubmit)().catch}>
        <Text fontWeight='bold' textAlign='center'>
          Let's start
        </Text>
      </Button>
    </View>
  )
}
