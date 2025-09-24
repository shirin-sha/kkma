import mongoose from 'mongoose'

let isConnected = false

export async function connectToDatabase(): Promise<void> {
  if (isConnected) {
    return
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kkma'

  try {
    const redacted = uri.replace(/:\/\/[\w.-]+:(.*?)@/, '://<user>:<redacted>@')
    console.log(`[db] connecting to ${redacted}`)
    await mongoose.connect(uri, {
      // Keep options minimal; Mongoose 8 uses sensible defaults
    })
    isConnected = true
    const dbName = mongoose.connection.db?.databaseName
    console.log(`[db] connected to database: ${dbName}`)
  } catch (err) {
    console.error('[db] connection error:', err)
    throw err
  }
}
