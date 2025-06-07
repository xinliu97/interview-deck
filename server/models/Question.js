import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: String,
  difficulty: String,
  description: String,
  answer: String,
})

export default mongoose.model('Question', questionSchema)
