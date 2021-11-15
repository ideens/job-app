import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 200 },
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
)

const postSchema = new mongoose.Schema(
  {
    project: { type: String, required: true, maxlength: 50 },
    experience: { type: String, required: true, maxlength: 200 },
    description: { type: String, required: true, maxlength: 600 },
    technologies: [{ type: String }],
    owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
)

postSchema.set('toJSON')
export default mongoose.model('Post', postSchema)
