import mongoose from 'mongoose'
import config from '../config'

const dbConnect = async () => {
  try {
    if (!config.database_url) {
      console.log('No Uri Found')
      process.exit(1)
    }
    await mongoose.connect(config.database_url as string)
    console.log('🔥 Database Connection Successful')
  } catch (err) {
    console.log(err)
  }
}

export default dbConnect
