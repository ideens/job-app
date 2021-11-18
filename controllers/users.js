import User from '../models/users.js'

//getting one user by their id
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('createdPosts')
    if (!user) throw new Error()
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'User not found' })
  }
}

//getting current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser._id)
      .populate('createdPosts')
      .populate('createdProfile')
      .populate('savedPosts')
    if (!user) throw new Error()
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'User not found' })
  }
}

//get all users

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find()
    if (!user) throw new Error()
    return res.status(200).json(user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'User not found' })
  }
}
