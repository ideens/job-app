import { useState, useEffect } from 'react'
import { getSinglePost } from '../helpers/api'
import PostsCard from './PostsCard'
import { useParams } from 'react-router-dom'

const SinglePost = () => {
  const [post, setPost] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getSinglePost(id).then(setPost)
  }, [id])

  return (
    <div>
      <PostsCard {...post} />
    </div>
  )
}

export default SinglePost
