import express from 'express'
import cors from 'cors'
import { allQuestions } from './questions.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// In-memory user store
const users = new Map()

app.post('/api/register', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' })
  }
  if (users.has(username)) {
    return res.status(400).json({ error: 'User already exists' })
  }
  users.set(username, { password })
  res.json({ success: true })
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  const user = users.get(username)
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }
  res.json({ token: `token-${username}` })
})

app.get('/api/questions', (req, res) => {
  res.json(allQuestions)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
