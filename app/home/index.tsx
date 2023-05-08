import { Box, View } from 'native-base'
import { useForm } from 'react-hook-form'
import { Timestamp } from 'firebase/firestore'
import { UserCard } from '../../components/Chats/UserCard'
import { CustomInput } from '../../components/shared/CustomInput'

const userMock = {
  username: 'Jarrison Cano',
  avatar: '',
  message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
  date: Timestamp.fromDate(new Date()),
  unread: 2
}

export default function Home (): JSX.Element {
  const { control } = useForm()
  return (
    <View>
      <Box>
        <CustomInput height='12' label='' name='find' control={control} placeholder='Search...' />
      </Box>
      <Box mt='10'>
          <UserCard {...userMock} />
          <UserCard {...userMock} unread={0} username='Kimjams' />
      </Box>
    </View>
  )
}
