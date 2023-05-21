import { type Timestamp } from 'firebase/firestore'

export interface Message {
	userId: string
	image?: string
	content: string
	createdAt: any
	status: {
		delivered: string[]
		read: string[]
	}
	responseOf?: string
}

export interface Event {
	id: string
	userId: string
	title: string
	description: string
	color: string
	createdAt: any
	startDate: any
	endDate: any
}

export interface Group {
	id: string
	name: string
	description: string
	avatar: string
	members: string[]
	admins: string[]
	chat: Message[]
	events: Event[]
	createdAt: Date
}
