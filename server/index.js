import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Question from './models/Question.js'
import UserProgress from './models/UserProgress.js'
import { seedQuestions } from './seedData.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

async function connectDatabase() {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI)
  } else {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  }
}

app.get('/api/questions', async (req, res) => {
  const list = await Question.find().select('-_id -__v').lean()
  res.json({ status: 'success', data: list })
})

app.get('/api/questions/:id', async (req, res) => {
  const q = await Question.findOne({ id: Number(req.params.id) }).select('-_id -__v').lean()
  if (!q) return res.status(404).json({ status: 'error', message: 'Not found' })
  res.json({ status: 'success', data: q })
})

app.post('/api/questions/:id/notes', async (req, res) => {
  const { userId, notes } = req.body
  await UserProgress.findOneAndUpdate(
    { userId, questionId: Number(req.params.id) },
    { notes },
    { upsert: true }
  )
  res.json({ status: 'success', message: 'Notes saved' })
})

app.post('/api/questions/:id/mark-done', async (req, res) => {
  const { userId } = req.body
  await UserProgress.findOneAndUpdate(
    { userId, questionId: Number(req.params.id) },
    { isDone: true },
    { upsert: true }
  )
  res.json({ status: 'success', message: 'Marked done' })
})

app.get('/api/questions/:id/progress', async (req, res) => {
  const { userId } = req.query
  const progress = await UserProgress.findOne({ userId, questionId: Number(req.params.id) }).select('-_id -__v').lean()
  res.json({ status: 'success', data: progress })
})

async function start() {
  try {
    await connectDatabase()
    const count = await Question.countDocuments()
    if (count === 0) {
      await Question.insertMany(seedQuestions)
    }
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

start()
