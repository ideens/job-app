import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [error, setError] = useState('')
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', loginData)
      if (data.token) {
        localStorage.setItem('token', data.token)
        const token = data.token
        console.log('TOKEN - ', token)
        handleSuccessfulLogin()
      }
    } catch (err) {
      console.log(err)
      setError('Incorrect email or password.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSuccessfulLogin = () => {
    console.log('SUCCESSFULLY LOGGED IN')
    navigate('/landing')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Your Email"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <input type="submit" value="Log in" />
      </form>
      <p>{error}</p>
    </div>
  )
}

export default Login
