import React from 'react'
import { Link } from 'react-router-dom'
import PostSave from './PostSave'

const PostsCard = ({ _id, project, technologies, experience, description }) => {
  return (
    <div>
      <Link to={`/landing/${_id}`}>
        <div>
          <h2>{project}</h2>
          <p>
            Experience: <br /> {experience}
          </p>
          <p>
            Description: <br /> {description}
          </p>
          <p>
            Technologies: <br /> {technologies}
          </p>
        </div>
      </Link>
      <div>
        <PostSave />
      </div>
    </div>
  )
}

export default PostsCard
