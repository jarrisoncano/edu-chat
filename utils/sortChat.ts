import { Message } from '../types/Group'

export const sortChat = (chat: Message[]) => {
	return chat.sort((a, b) => {
		const aDate = a.createdAt.toDate ? a.createdAt.toDate() : a.createdAt
		const bDate = b.createdAt.toDate ? b.createdAt.toDate() : b.createdAt

		if (aDate > bDate) return 1
		if (aDate < bDate) return -1
		return 0
	})
}
