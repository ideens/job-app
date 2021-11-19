import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostSave from './PostSave'
import { getPayload } from '../helpers/auth'
import '../styles/_PostsCard.scss'

const PostsCard = ({
  _id,
  project,
  technologies,
  experience,
  description,
  saved,
}) => {
  const [isSaved, setIsSaved] = useState(false)
  const userId = getPayload()
  console.log('USER ID', userId)
  console.log(saved)

  useEffect(() => {
    const check = saved.some((save) => save.owner === userId)
    console.log(check)
    setIsSaved(check)
  }, [])

  return (
    <div className="container-postcards">
      <Link to={`/landing/${_id}`} style={{ textDecoration: 'none' }}>
        <div className="read-more"><span>Read More</span></div>
        <div className="postscard-container">
          <h2>{project}</h2>
          <p className="heading">Experience</p>
          <p>{experience}</p>
          {/* <p className="heading">Description</p>
          <p>{description}</p> */}
          <p className="heading">Technologies</p>
          <ul>
            {technologies.map((t) => (
              <li>{t}</li>
            ))}
          </ul>
        </div>
      </Link>
      <div className="save-button">
        <PostSave id={_id} isSaved={isSaved} setIsSaved={setIsSaved} />
      </div>
    </div>
  )
}

export default PostsCard
