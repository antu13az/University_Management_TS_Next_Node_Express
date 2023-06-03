import path from 'path'
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf, prettyPrint } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()

  return `${date.toDateString()} ${hour}: ${minutes}: ${second} [${label}] ${level}: ${message}`
})
const successLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UN MN' }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),

    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})

const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right meow!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'err.log'),
      level: 'error',
    }),
  ],
})

export { successLogger, errorLogger }
