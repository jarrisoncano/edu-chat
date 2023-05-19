import { routes } from '../../utils/routes'
import { Slot, usePathname } from 'expo-router'
import { MenuBar } from '../../components/shared/MenuBar'
import { useListenUserChanges } from '../../services/user'
import { useListenUserGroupsChanges } from '../../services/chat'

export default function MainLayout() {
	useListenUserChanges()
	useListenUserGroupsChanges()
	const pathname = usePathname()
	const validPaths = [routes.home, routes.settings, routes.events]

	return (
		<>
			<Slot />
			{validPaths.includes(pathname) && <MenuBar />}
		</>
	)
}
