export interface Contact {
  uid: string
  name: string
  email: string
  avatar: string
  description: string
}

export interface User extends Contact {
  contacts: string[]
}
