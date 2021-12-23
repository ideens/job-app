import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 200 },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5 },
})

const profileSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: String, required: true },
  profileImage: { type: String, required: false },
  reviews: [reviewSchema],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
})

profileSchema.virtual('userAverageRating').get(function () {
  if (!this.reviews.length) return 'Not reviewed yet'
  const sumOfRatings = this.reviews.reduce((acc, review) => {
    if (!review.rating) return acc
    return acc + review.rating
  }, 0)

  return (sumOfRatings / this.reviews.length).toFixed(1)
})

profileSchema.set('toJSON', { virtuals: true })
profileSchema.plugin(uniqueValidator)

export default mongoose.model('Profile', profileSchema)
