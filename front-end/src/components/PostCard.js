import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

const PostCard = ({ _id, project, technologies, experience, description }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const handleDeletePost = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log(response.data)
      navigate('/landing')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <h2>{project}</h2>
        <p>
          Experience: <br /> {experience}
        </p>
        <p>
          Description: <br /> {description}
        </p>
        <p>
          Technologies: <br /> {technologies.map((t) => t.value)}
        </p>
      </div>
      <Link to={`/edit/${_id}`}>Edit</Link>
      <Link to="/landing" onClick={handleDeletePost}>
        Delete
      </Link>
    </div>
  )
}

export default PostCard
