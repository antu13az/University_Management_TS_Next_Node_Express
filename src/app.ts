import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dbConnect from './utils/databaseConnection'

const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Database Connection

dbConnect()

// Root Api
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
