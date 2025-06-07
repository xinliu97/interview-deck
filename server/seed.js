import mongoose from 'mongoose'
import Question from './models/Question.js'
import { seedQuestions } from './seedData.js'

async function run() {
  await mongoose.connect('mongodb://localhost:27017/interview_deck')
  await Question.deleteMany({})
  await Question.insertMany(seedQuestions)
  console.log('Seeded questions')
  await mongoose.disconnect()
}

run()
