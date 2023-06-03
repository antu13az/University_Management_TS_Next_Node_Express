import app from './app'
import config from './config/index'
import { successLogger } from './logger/logger'

app.listen(config.port, () => {
  successLogger.info(`🚀 Server is running on port ${config.port}`)
})
