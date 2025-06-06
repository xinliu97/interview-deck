import express from 'express'
import { questions } from './questions.js'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/api/questions', (req, res) => {
  res.json(questions)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
