import User from '../models/users.js'

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id).populate(
      'createdPosts'
    )
    if (!user) throw new Error()
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'User not found' })
  }
}
