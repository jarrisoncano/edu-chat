import { routes } from '../../../../utils/routes'
import { useAppSelector } from '../../../../store'
import { ScrollView, Text, View } from 'native-base'
import { Header } from '../../../../components/shared/Header'
import { UserCardInf } from '../../../../components/shared/UserCardInf'

export default function Contacts() {
	const user = useAppSelector((state) => state.userSlice.user)
	const contacts = useAppSelector((state) => state.userSlice.contacts)

	return (
		<View>
			<Header primaryText='Contacts' variant='secondary' secondaryText='' route={routes.addContact} showIcon />

			<ScrollView mt='8' showsVerticalScrollIndicator={false}>
				{contacts.length === 0 && <Text>No contacts</Text>}
				{contacts.map((contact) => (
					<UserCardInf key={contact.uid} contact={contact} userId={user?.uid} remove isContact={undefined} />
				))}
			</ScrollView>
		</View>
	)
}
