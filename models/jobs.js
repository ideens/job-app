import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  jobDescription: { type: String, required: true, maxlength: 300 },
  salary: { type: Number },
})

jobSchema.set('toJSON')

export default mongoose.model('Job', jobSchema)
