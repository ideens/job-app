import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  bio: { type: String, required: true, maxlength: 300 },
  skills: { type: String, required: true, maxlength: 300 },
  experience: { type: String, required: true, maxlength: 300 },
})
