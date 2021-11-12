import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Posts from '../components/Posts'
import { getCurrentUser } from '../helpers/api'

const Landing = () => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getCurrentUser().then(setUserName)
  }, [])

  return (
    <div>
      <h1>TECHANIC</h1>
      <h2>Hi, {userName}</h2>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/landing">Home</Link>
      </nav>
      <Posts />
    </div>
  )
}

export default Landing
