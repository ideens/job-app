import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/register', formData)
      console.log('DATA', data)
    } catch (err) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.passwordConfirmation
      ) {
        setError('Please check you have filled out all fields.')
      } else {
        setError('This email is already attached to an account.')
      }
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
            placeholder="Your Name"
            type="text"
            name="name"
            value={formData.name}
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
          <input type="submit" value="Register" />
        </form>
      </div>
      <p>{error}</p>
    </div>
  )
}

export default Register
