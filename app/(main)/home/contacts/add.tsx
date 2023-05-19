import { routes } from '../../../../utils/routes'
import { useAppSelector } from '../../../../store'
import { ScrollView, Text, View } from 'native-base'
import { Header } from '../../../../components/shared/Header'
import { useFetchListOfUsers } from '../../../../services/contacts'
import { UserCardInf } from '../../../../components/shared/UserCardInf'

export default function AddContact() {
	const { isLoading, data } = useFetchListOfUsers()
	const user = useAppSelector((state) => state.userSlice.user)

	return (
		<View>
			<Header primaryText='Search users' variant='secondary' secondaryText='' route={routes.addContact} />
			<ScrollView mt='8' showsVerticalScrollIndicator={false}>
				{data && data.length === 0 && <Text>No users</Text>}
				{isLoading && <Text>Loading...</Text>}
				{data &&
					data.map((crrUser) => (
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
