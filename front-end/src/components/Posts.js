import React, { useEffect, useState } from 'react'
import { getPosts } from '../helpers/api'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post._id} />
        ))}
      </ul>
    </div>
  )
}

export default Posts
