import { useI18n } from '../../../../i18n/usei18n'
import { useAppSelector } from '../../../../store'
import { ScrollView, Text, View } from 'native-base'
import { Header } from '../../../../components/shared/Header'
import { UserCardInf } from '../../../../components/shared/UserCardInf'

export default function Users() {
	const i18n = useI18n()
	const user = useAppSelector((state) => state.userSlice.user)
	const users = useAppSelector((state) => state.userSlice.users)

	return (
		<View>
			<Header
				primaryText={i18n?.home.users ?? ''}
				secondaryText={i18n?.home.users_description ?? ''}
				route={''}
				showIcon={undefined}
			/>

			<ScrollView mt='8' showsVerticalScrollIndicator={false}>
				{users.length === 0 && <Text>{i18n?.home.notUsers}</Text>}
				{users.map((contact) => (
					<UserCardInf key={contact.uid} contact={contact} userId={user?.uid} />
				))}
			</ScrollView>
		</View>
	)
}
