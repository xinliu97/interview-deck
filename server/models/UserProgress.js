import mongoose from 'mongoose'

const userProgressSchema = new mongoose.Schema({
  userId: String,
  questionId: Number,
  isDone: { type: Boolean, default: false },
  notes: { type: String, default: '' },
})

export default mongoose.model('UserProgress', userProgressSchema)
