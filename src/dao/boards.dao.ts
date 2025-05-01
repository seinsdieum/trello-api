import JsonStorage from '../modules/JsonStorage'
import { Board } from '../validators/boards.validation'

const defaultEntities: Board[] = [
  {
    id: 1,
    name: 'test_board_1',
    color: 'red',
    description: 'red board',
    createdBy: 1
  },
  {
    id: 2,
    name: 'test_board_2',
    color: 'green',
    description: 'green board',
    createdBy: 1
  },
  {
    id: 3,
    name: 'test_board_3',
    color: 'blue',
    description: 'blue board',
    createdBy: 1
  }
]

export async function getBoardStorage() {
  return JsonStorage.create<Board, number>(
    'boards',
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
