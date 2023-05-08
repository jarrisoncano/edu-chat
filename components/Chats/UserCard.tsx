import { format } from 'date-fns'
import { useAssets } from 'expo-asset'
import { Avatar, Flex, Text } from 'native-base'
import { type Timestamp } from 'firebase/firestore'

interface UserCardProps {
  username: string
  avatar: string
  message: string
  date: Timestamp
  unread: number
}

export const UserCard = (props: UserCardProps): JSX.Element => {
  const [assets] = useAssets([require('../../assets/images/avatar.png')])
  const imageURI = props.avatar ? props.avatar : assets?.[0].localUri

  return (
        <Flex flexDir='row' height='20' mt='2'>
            <Flex width='1/5' justifyContent='center' alignItems='center'>
                <Avatar
                    size='lg'
                    source={{
                      uri: imageURI ?? undefined
                    }}
                >
                    <Avatar.Badge bg='green.500' alignItems='center' justifyContent='center' />
                </Avatar>
            </Flex>
            <Flex width='4/5' px='2' py='1' pl='4' justifyContent='space-between'>
                <Flex flexDir='row' justifyContent='space-between' alignItems='center'>
                    <Text fontWeight='bold' fontSize='md'>
                        {props.username}
                    </Text>
                    <Text fontSize='xs'>{format(props.date.toDate(), 'p')}</Text>
                </Flex>
                <Flex flexDir='row' justifyContent='space-between'>
                    <Text numberOfLines={2} fontSize='sm' color='blueGray.400' width={props.unread > 0 ? '5/6' : 'full' }>
                        {props.message}
                    </Text>
                    {
                        props.unread > 0 && (
                            <Flex justifyContent='center' width='6' bg='green.500' height='6' borderRadius='full'>
                                <Text color='white' fontSize='xs' textAlign='center' fontWeight='bold'>
                                    {props.unread}
                                </Text>
                            </Flex>
                        )
                    }
                </Flex>
            </Flex>
        </Flex>
  )
}
