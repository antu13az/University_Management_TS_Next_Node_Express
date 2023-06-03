import mongoose from 'mongoose'
import config from '../config'
import { errorLogger, successLogger } from '../logger/logger'

const dbConnect = async () => {
  try {
    if (!config.database_url) {
      errorLogger.error('No Uri Found')
      process.exit(1)
    }
    await mongoose.connect(config.database_url as string)
    successLogger.info('🔥 Database Connection Successful')
  } catch (err) {
    errorLogger.error(err)
  }
}

export default dbConnect
