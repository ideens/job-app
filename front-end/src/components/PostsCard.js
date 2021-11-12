import React from 'react'
import { Link } from 'react-router-dom'

const PostsCard = ({ _id, project, requirements, experience, description }) => {
  return (
    <div>
      <Link to="/_id">
        <h2>{project}</h2>
      </Link>
      <p>{requirements}</p>
      <p>{experience}</p>
      <p>{description}</p>
    </div>
  )
}

export default PostsCard
