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
      <div className="postcard-container">
        <h2>{project}</h2>
        <p className="heading">
          Experience: <br /> 
          
          </p>
          <p className="text-fields">{experience}</p>
        <p className="heading">
          Description: <br /> 
         
        </p>
        <p className="text-fields"> {description} </p>
        <p className="heading">Technologies-Needed:</p>
          <ul>
            {technologies.map((t) => (
              <li>{t.value}</li>
            ))}
          </ul>
      </div>
      <Link className="edit-button" to={`/edit/${_id}`}>Edit</Link>
      <Link className="delete-button" to="/landing" onClick={handleDeletePost}>
        Delete
      </Link>
    </div>
  )
}

export default PostCard
