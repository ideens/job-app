import Profile from '../models/profile.js'

export const addProfile = async (req, res) => {
  try {
    const newProfile = { ...req.body, owner: req.currentUser._id }
    const addProfile = await Profile.create(newProfile)
    console.log('ADD PROFILE - ', addProfile)
    return res.status(201).json(addProfile)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params
    const profileToUpdate = await Profile.findById(id)
    if (!profileToUpdate) throw new Error()
    if (!profileToUpdate.owner.equals(req.currentUser._id)) throw new Error()
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedProfile) throw new Error(422)
    return res.status(200).json(updatedProfile)
  } catch (err) {}
}

export const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params
    const profileToDelete = await Profile.findById(id)
    if (!Profile) throw new Error()
    await profileToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log('ERROR deleting profile')
    return res.status(404).json({ message: 'Profile Not Found' })
  }
}
