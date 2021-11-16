import axios from 'axios'
import React, { useState } from 'react'

const Profile = () => {
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    experience: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('api/me/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('PROFILE DATA - ', data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div>
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
          <input type="submit" value="Add profile" />
        </form>
      </div>
    </div>
  )
}

export default Profile
