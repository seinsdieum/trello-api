import JsonStorage from '../modules/JsonStorage'
import { User } from '../validators/user.validation'

const defaultEntities: User[] = [
  {
    id: 1,
    password: 'adminpass',
    role: 'admin'
  },
  {
    id: 2,
    password: 'clientpass',
    role: 'client'
  }
]

export async function getUserStorage() {
  return JsonStorage.create<User, number>(
    'users',
    async records => {
      return (
        records.reduce(
          (maxId, record) => (record.id > maxId ? record.id : maxId),
          0
        ) + 1
      )
    },
    defaultEntities
  )
}
