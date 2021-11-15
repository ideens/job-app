import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

const selectOptions = [
  { value: 'React', label: 'React' },
  { value: 'Javascript', label: 'Javascript' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'HTML5', label: 'HTML5' },
  { value: 'React', label: 'React' },
  { value: 'CSS', label: 'CSS' },
]

const PostAdd = () => {
  const [formData, setFormData] = useState({
    project: '',
    experience: '',
    description: '',
    technologies: [],
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/posts', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('NewPost--> ', data)
      handleSuccessfulPost()
    } catch (err) {
      console.log(err)
    }
  }

  const handleMultiChange = (selected, name) => {
    console.log('SELECTED - ', selected)
    const values = selected ? selected.map((item) => item.value) : []
    setFormData({ ...formData, [name]: [...values] })
    console.log(formData)
  }

  const handleSuccessfulPost = () => {
    console.log('SUCCESSFULLY MADE A POST')
    navigate('/landing')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          onChange={(selected) => handleMultiChange(selected, 'technologies')}
        />
        <input type="submit" value="Add Post" />
      </form>
    </div>
  )
}

export default PostAdd
