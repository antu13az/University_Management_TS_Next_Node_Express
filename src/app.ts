import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRoutes from './app/modules/users/user.route'
import dbConnect from './utils/databaseConnection'
const app: Application = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Database Connection

dbConnect()

// Application all controllers routs

app.use('/api/v1/users/', userRoutes)

// Root Api
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
