import JsonStorage from '../modules/JsonStorage'
import { Card, CardStatus } from '../validators/cards.validation'

const defaultEntities: Card[] = [
  {
    id: 1,
    name: 'test_card_1',
    description: 'hello',
    dueDate: new Date(),
    estimated: new Date(),
    status: CardStatus.pending,
    labels: ['project', 'v1'],
    createdBy: 1
  },
  {
    id: 2,
    name: 'test_card_2',
    description: 'bonjour',
    dueDate: new Date(),
    estimated: new Date(),
    status: CardStatus.pending,
    labels: ['project', 'v2'],
    createdBy: 1
  },
  {
    id: 3,
    name: 'test_card_3',
    description: 'привет',
    dueDate: new Date(),
    estimated: new Date(),
    status: CardStatus.pending,
    labels: ['project', 'v3'],
    createdBy: 1
  }
]

export async function getCardStorage() {
  return JsonStorage.create<Card, number>(
    'cards',
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
