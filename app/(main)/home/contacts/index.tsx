import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { routes } from '../../../../utils/routes'
import { useAppSelector } from '../../../../store'
import { ScrollView, Text, View } from 'native-base'
import { Header } from '../../../../components/shared/Header'
import { UserCardInf } from '../../../../components/shared/UserCardInf'

export default function Contacts() {
	const router = useRouter()
	const user = useAppSelector((state) => state.userSlice.user)
	const contacts = useAppSelector((state) => state.userSlice.contacts)

	return (
		<View>
			<Header
				primaryText='Contacts'
				variant='secondary'
				secondaryText=''
				route={''}
				showIcon={{
					icon: <Ionicons name='person-add' size={20} color='white' />,
					onPress: () => router.push(routes.addContact)
				}}
			/>

			<ScrollView mt='8' showsVerticalScrollIndicator={false}>
				{contacts.length === 0 && <Text>No contacts</Text>}
				{contacts.map((contact) => (
					<UserCardInf key={contact.uid} contact={contact} userId={user?.uid} remove isContact={undefined} />
				))}
			</ScrollView>
		</View>
	)
}
