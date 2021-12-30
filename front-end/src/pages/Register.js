import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
//import { Form, Col, Container } from 'react-bootstrap'

const Register = () => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [profileData, setProfileData] = useState({
    bio: '',
    skills: '',
    experience: '',
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post('/api/register', formData)

      console.log('DATA', data)
      const { biodata } = await axios.post('/api/me/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      console.log('bioData ->', biodata)
      handleSuccessfulRegister()
    } catch (err) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.passwordConfirmation ||
        !profileData.bio ||
        !profileData.skills ||
        !profileData.experience
      ) {
        setError('Please check you have filled out all fields.')
      } else {
        setError('Error registering.')
      }
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setProfileData({ ...profileData, [name]: value })
  }

  const handleSuccessfulRegister = () => {
    console.log('SUCCESSFULLY REGISTERED')
    navigate('/login')
  }

  return (
    <div className="yellow">
      <h1>Register your account</h1>
      <div className="register-container">
        <form className="flex-form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            placeholder="Your Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            placeholder="Confirm password"
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
          <input className="register-cta" type="submit" value="Register" />
        </form>
      </div>
      <p>{error}</p>
    </div>
  )
}

export default Register
