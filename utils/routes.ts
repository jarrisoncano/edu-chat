export const routes = {
	signIn: '/signIn',
	signUp: '/signUp',
	setUser: '/user/setUser',
	chat: (id: string) => `/home/chat/${id}`,
	detailChat: (id: string) => `/home/chat/detail/${id}`,
	updateGroup: (id: string) => `/home/groups/update/${id}`,
	onboarding: '/onboarding',
	home: '/home',
	events: '/events',
	createEvent: '/events/createEvent',
	settings: '/user/settings',
	createGroup: '/home/groups/createGroup',
	contacts: '/home/contacts',
	addContact: '/home/contacts/add'
}
