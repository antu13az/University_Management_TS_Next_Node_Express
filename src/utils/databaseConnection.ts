import mongoose from 'mongoose'
import config from '../config/index'
import { errorLogger, successLogger } from '../logger/logger'

const dbConnect = async () => {
  try {
    if (!config.database_url) {
      errorLogger.error('Database url not specified')
    }
    await mongoose.connect(config.database_url as string)
    successLogger.info('Database connected')
  } catch (err) {
    errorLogger.error(err)
  }
}

export default dbConnect
