import { type Timestamp } from "firebase/firestore"

export interface Message {
  userId: string
  image?: string
  content: string
  createdAt: Timestamp
  status?: {
    delivered: string[]
    read: string[]
  }
  responseOf?: string
}

export interface Group {
  id: string
  name: string
  description: string
  avatar: string
  members: string[]
  admins: string[]
  chat: Message[]
  createdAt: Date
}
