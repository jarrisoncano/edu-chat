export const routes = {
	signIn: '/signIn',
	signUp: '/signUp',
	setUser: '/user/setUser',
	chat: (id: string) => `/home/chat/${id}`,
	detailChat: (id: string) => `/home/chat/detail/${id}`,
	onboarding: '/onboarding',
	home: '/home',
	events: '/events',
	settings: '/settings',
	createGroup: '/home/createGroup',
	contacts: '/home/contacts',
	addContact: '/home/contacts/add'
}
