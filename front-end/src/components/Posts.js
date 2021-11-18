import React, { useEffect, useState } from 'react'
import { getPosts } from '../helpers/api'
import PostsCard from './PostsCard'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  return (
    <div>
      <div className="postscard-container-parent">
        {posts.length &&
          posts.map((post) => (
            <div key={post._id}>
              <PostsCard {...post} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Posts
