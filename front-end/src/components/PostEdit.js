import React, { useState, useEffect } from 'react'
import { getSinglePost } from '../helpers/api'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { selectOptions } from '../helpers/options.js'
import axios from 'axios'

const PostEdit = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    project: '',
    experience: '',
    description: '',
    technologies: [],
  })

  useEffect(() => {
    getSinglePost(id).then(setFormData)
  }, [id])

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
  }

  const handleMultiChange = (selected, name) => {
    console.log('SELECTED - ', selected)
    const values = selected ? selected.map((item) => item.value) : []
    setFormData({ ...formData, [name]: [...selected] })
    console.log(values)
    console.log(formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const newData = { ...formData }
    newData.technologies = newData.technologies.map((t) => t.value)

    try {
      const updatedData = await axios.put(`/api/posts/${id}`, newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/landing')
      console.log('UPDATED POST - ', updatedData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="container">
      <h2>Edit Your Post Below</h2>
    <div className="post-container">
      <div className="container-postcards-addPost">
      <form>
        <input
          placeholder="Project"
          type="text"
          name="project"
          value={formData.project}
          onChange={handleChange}
        />
        <input
          placeholder="Experience"
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <input
          placeholder="Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Select
          isMulti
          name="technologies"
          options={selectOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          value={formData.technologies}
          onChange={(selected) => handleMultiChange(selected, 'technologies')}
        />
        <Link className="update-button" to="/landing" onClick={handleSubmit}>
          Update Post
        </Link>
      </form>
      </div>
    </div>
    </section>
  
  )
}

export default PostEdit
