import { Timestamp } from "firebase/firestore"

export interface Message {
  id: string
  sender: string
  image?: string
  content: string
  createdAt: Date
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
