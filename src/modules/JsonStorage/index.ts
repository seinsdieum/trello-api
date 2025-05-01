import fs from 'fs/promises'
import { resolve } from 'path'

const STORAGE_DIR = 'json'
const STORAGE_FILE = 'storage.json'
const { cwd } = process
class JsonStorage<T extends { id: K; createdAt?: Date }, K> {
  private path: string = ''
  private generateKey: (records: T[]) => Promise<K | null> = async () => null
  private constructor(
    path: string,
    keyGenerator: (records: T[]) => Promise<K | null>
  ) {
    this.path = path
    this.generateKey = keyGenerator
  }

  static async create<T extends { id: KeyT }, KeyT>(
    name: string,
    keyGenerator: (records: T[]) => Promise<KeyT | null>,
    defaultEntities?: T[]
  ): Promise<JsonStorage<T, KeyT>> {
    const fullPath = resolve(cwd(), STORAGE_DIR, name, STORAGE_FILE)
    await fs.mkdir(resolve(cwd(), STORAGE_DIR), { recursive: true })
    await fs.mkdir(resolve(cwd(), STORAGE_DIR, name), { recursive: true })

    try {
      await fs.access(fullPath)
    } catch {
      await fs.writeFile(
        fullPath,
        defaultEntities ? JSON.stringify(defaultEntities) : []
      )
    }
    return new JsonStorage(fullPath, keyGenerator)
  }
  async write(record: T): Promise<T> {
    const data = JSON.parse((await fs.readFile(this.path)).toString())
    const key = await this.generateKey(data)
    if (!key) throw new Error('Key generation error')
    record.id = key
    record.createdAt = new Date()
    data.push(record)
    await fs.writeFile(this.path, JSON.stringify(data))
    return record
  }

  async readAll(): Promise<T> {
    const data = JSON.parse((await fs.readFile(this.path)).toString())
    return data
  }

  async read(key?: K): Promise<T> {
    const data = JSON.parse((await fs.readFile(this.path)).toString())
    return data.find((x: T) => !key || x.id === key)
  }

  async delete(key?: K): Promise<T | null> {
    const data = JSON.parse((await fs.readFile(this.path)).toString())
    let f: T | null = null
    await fs.writeFile(
      this.path,
      JSON.stringify(
        data.filter((x: T) => {
          if (x.id === key) f = x
          return !key || x.id !== key
        })
      )
    )
    if (!f) throw new Error('Record not found')
    return f
  }
  async update(key: K, value: T): Promise<T | null> {
    const data = JSON.parse((await fs.readFile(this.path)).toString())

    let changed: T | null = null

    const updatedData = data.map((item: T) => {
      if (item.id !== key) return item
      changed = { ...item, ...value }
      return changed
    })

    if (!changed) throw new Error('Record not found')

    await fs.writeFile(this.path, JSON.stringify(updatedData, null, 2))

    return changed
  }
}

export default JsonStorage
