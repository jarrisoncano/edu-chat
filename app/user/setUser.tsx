import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { routes } from '../../utils/routes'
import { useAppSelector } from '../../store'
import { TouchableOpacity } from 'react-native'
import { useFetchUpdateUser } from '../../services/user'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Avatar, Box, Button, Image, Text, View } from 'native-base'
import { CustomTextArea } from '../../components/shared/CustomTextArea'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'

interface Form {
  photoURL: string
  description: string
}

export default function SetUser () {
  const { isLoading, mutate } = useFetchUpdateUser()
  const user = useAppSelector((state) => state.userSlice.user)
  const router = useRouter()
  const {
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Form>({
    defaultValues: {
      description: ''
    }
  })

  const secondaryText = !user?.avatar || !user?.description ? 'Complete your profile' : 'Update your profile'

  const uploadImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    const image = result?.assets?.[0]

    if (!result.canceled && image) {
      const uri = image.uri
      setValue('photoURL', uri)
    }
  }

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { photoURL, description } = data
    if (!user) return

    mutate({ ...user, avatar: photoURL, description })
    reset()
    router.push(routes.chat)
  }

  useEffect(() => {
    if (user?.description) setValue('description', user?.description)
    if (user?.avatar) setValue('photoURL', user?.avatar)
  }, [user])

  return (
        <View pt='20' justifyContent='flex-start'>
            <Box>
                <Text color='white' fontSize='2xl' fontWeight='bold'>
                    Profile Settings 🛠
                </Text>
                <Text color='blueGray.400' fontSize='sm'>
                    {secondaryText}
                </Text>
            </Box>
            <Box mt='12' alignItems='center'>
                <TouchableOpacity
                    onPress={() => {
                      uploadImage().catch(() => { })
                    }}
                >
                    <Avatar bgColor='blueGray.600' size='2xl'>
                        {watch('photoURL')
                          ? (
                                <Image
                                    width={'full'}
                                    height={'full'}
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
            <Button
                mt='10'
                isLoading={isLoading}
                onTouchEnd={() => handleSubmit(onSubmit)().catch}
            >
                <Text fontWeight='bold' textAlign='center'>
                    Let's start
                </Text>
            </Button>
        </View>
  )
}
