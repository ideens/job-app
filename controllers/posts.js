import Post from '../models/post.js'

//GET POSTS
export const getAllPosts = async (_req, res) => {
  const allPosts = await Post.find()
  console.log('ALL POSTS - ', allPosts)
  return res.status(200).json(allPosts)
}

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params
    const singlePost = await Post.findById(id).populate('owner')
    console.log(singlePost)
    return res.status(200).json(singlePost)
  } catch (err) {
    console.log('ERROR getting single Post')
    console.log(err)
    return res.status(404).json({ message: 'Post Not Found' })
  }
}

export const addAPost = async (req, res) => {
  try {
    console.log('CURRENT USER - ', req.currentUser)
    const newPost = { ...req.body, owner: req.currentUser._id }
    const addPost = await Post.create(newPost)
    console.log(addPost)
    return res.status(201).json(addPost)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

export const removePost = async (req, res) => {
  try {
    const { id } = req.params
    const postToDelete = await Post.findById(id)
    if (!postToDelete) throw new Error()
    if (!postToDelete.owner.equals(req.currentUser._id)) throw new Error()
    await postToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log('ERROR deleting post')
    return res.status(404).json({ message: 'Post Not Found' })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const postToUpdate = await Post.findById(id)
    console.log('POST TO UPDATE', postToUpdate)
    if (!postToUpdate) throw new Error()
    if (!postToUpdate.owner.equals(req.currentUser._id)) throw new Error()
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedPost) throw new Error(422)
    return res.status(200).json(updatedPost)
  } catch (err) {
    console.log(err)
    return res.sendStatus(
      isNaN(Number(err.message)) ? 422 : Number(err.message)
    )
  }
}

export const addAComment = async (req, res) => {
  try {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) throw new Error()
    const newComment = { ...req.body, owner: req.currentUser._id }
    post.comments.push(newComment)
    await post.save({ validateModifiedOnly: true })
    return res.status(200).json(post)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'ERROR - could not post comment' })
  }
}

export const toggleSave = async (req, res) => {
  try {
    const { id } = req.params
    const postSave = await Post.findById(id)
    if (!postSave) throw new Error()
    console.log('POSTSAVE.SAVED', postSave.saved)
    const match = postSave.saved.find((save) =>
      save.owner.equals(req.currentUser._id)
    )
    if (match) {
      console.log('MATCH - Remove this save')
      console.log('MATCH', match)
      match.remove()
      await postSave.save({ validateModifiedOnly: true })
      console.log('MATCH AFTER', postSave)
    } else {
      const newSave = { ...req.body, owner: req.currentUser._id }
      console.log('NO MATCH - SAVE - ', newSave)
      postSave.saved.push(newSave)
      await postSave.save({ validateModifiedOnly: true })
      console.log('POSTSAVED', postSave)
    }
  } catch (err) {
    console.log(err)
  }
}

// export const saveAPost = async (req, res) => {
//   try {
//     const { id } = req.params
//     const post = await Post.findById(id)
//     if (!post) throw new Error()
//     const newSave = { ...req.body, owner: req.currentUser._id }
//     console.log('SAVE - ', newSave)
//     post.saved.push(newSave)
//     await post.save({ validateModifiedOnly: true })
//     return res.status(200).json(post)
//   } catch (err) {
//     return res.status(404).json({ message: 'Could not save post' })
//   }
// }

// export const unsaveAPost = async (req, res) => {
//   try {
//     const { id, saveId } = req.params
//     const post = await Post.findById(id)
//     if (!post) throw new Error()
//     const postToUnsave = post.saved.id(saveId)
//     if (!postToUnsave) throw new Error()
//     if (!postToUnsave.owner.equals(req.currentUser._id)) throw new Error()
//     await postToUnsave.remove()
//     await post.save({ validateModifiedOnly: true })
//     return res.status(200).json(post)
//   } catch (err) {
//     return res.status(404).json({ message: 'Save not found' })
//   }
// }
