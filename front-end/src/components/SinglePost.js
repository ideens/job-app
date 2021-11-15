import { useState, useEffect } from 'react'
import { getSinglePost } from '../helpers/api'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard'

const SinglePost = () => {
  const [post, setPost] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    getSinglePost(id).then(setPost)
  }, [id])

  return <div>{post && <PostCard {...post} />}</div>
}

export default SinglePost
