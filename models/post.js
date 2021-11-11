import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const postSchema = new mongoose.Schema(
  {
    project: { type: String, required: true, maxlength: 50 },
    requirements: { type: String, required: true, maxlength: 300 },
    experience: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 600 },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
)

postSchema.set('toJSON')
export default mongoose.model('Post', postSchema)
