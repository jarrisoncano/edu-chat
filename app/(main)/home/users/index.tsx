import { useAppSelector } from '../../../../store'
import { ScrollView, Text, View } from 'native-base'
import { Header } from '../../../../components/shared/Header'
import { UserCardInf } from '../../../../components/shared/UserCardInf'

export default function Users() {
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)

	return (
		<View>
			<Header primaryText='Users' secondaryText='List of the users in the app' route={''} showIcon={undefined} />

			<ScrollView mt='8' showsVerticalScrollIndicator={false}>
				{users.length === 0 && <Text>No Users</Text>}
				{users.map((contact) => (
					<UserCardInf key={contact.uid} contact={contact} userId={user?.uid} />
				))}
			</ScrollView>
		</View>
	)
}
