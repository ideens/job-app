import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getProfile } from '../helpers/api'
import { useNavigate } from 'react-router-dom'

const ProfileUpdate = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    experience: '',
  })

  useEffect(() => {
    getProfile().then(setFormData)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    const newData = { ...formData }
    try {
      const updatedData = await axios.put('api/profile', newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate('/profile')
      console.log('UPDATED PROFILE DATA - ', updatedData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newFormData)
  }

  return (
    <div>
      <h1>Update Profile</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a bio"
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <input
            placeholder="Enter your skills"
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />
          <input
            placeholder="Enter your experience"
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
          <input type="submit" value="Update" />
        </form>
      </div>
    </div>
  )
}

export default ProfileUpdate
