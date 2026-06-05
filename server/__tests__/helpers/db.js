import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { beforeAll, afterAll, afterEach } from '@jest/globals'

export function setupTestDB() {
  let mongod

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    await mongoose.connect(mongod.getUri())
    await mongoose.syncIndexes()   // ensure unique indexes are built before tests run
  })

  afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany({})
    }
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongod.stop()
  })
}
