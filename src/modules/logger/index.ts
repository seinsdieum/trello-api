import { createLogger, format, transports } from 'winston'
import { resolve } from 'path'
const { cwd } = process
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`
    })
  ),
  transports:
    process.env.NODE_ENV?.trimEnd() === 'production'
      ? [new transports.File({ filename: resolve(cwd(), 'app.log') })]
      : [
          (() => {
            return new transports.Console()
          })()
        ]
})
export default logger
