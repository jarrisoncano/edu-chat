import { routes } from '../../../../utils/routes'
import { useAppSelector } from '../../../../store'
import { ScrollView, Text, View } from 'native-base'
import { Header } from '../../../../components/shared/Header'
import { UserCardInf } from '../../../../components/shared/UserCardInf'

export default function AddContact() {
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)

	return (
		<View>
			<Header primaryText='Search users' variant='secondary' secondaryText='' route={routes.addContact} />
			<ScrollView mt='8' showsVerticalScrollIndicator={false}>
				{users.length === 0 && <Text>No users</Text>}
				{users.map((crrUser) => (
					<UserCardInf
						add
						key={crrUser.uid}
						contact={crrUser}
						userId={user?.uid}
						isContact={!!user?.contacts.includes(crrUser.uid)}
					/>
				))}
			</ScrollView>
		</View>
	)
}
