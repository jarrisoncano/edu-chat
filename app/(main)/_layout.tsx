import { Box, useColorMode } from 'native-base'
import { routes } from '../../utils/routes'
import { Slot, usePathname } from 'expo-router'
import { MenuBar } from '../../components/shared/MenuBar'
import { useListenUserGroupsChanges } from '../../services/groups'
import { useListenUserChanges, useListenUsersChanges } from '../../services/user'

export default function MainLayout() {
	useListenUserChanges()
	useListenUsersChanges()
	useListenUserGroupsChanges()

	const pathname = usePathname()
	const validPaths = [routes.home, routes.settings, routes.events]

	const { colorMode } = useColorMode()

	const bgColor = colorMode === 'dark' ? 'blueGray.800' : 'white'

	return (
		<Box h='full' bgColor={bgColor}>
			<Slot />
			{validPaths.includes(pathname) && <MenuBar />}
		</Box>
	)
}
