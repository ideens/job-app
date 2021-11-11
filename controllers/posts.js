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
