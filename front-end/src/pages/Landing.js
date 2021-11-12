import React from 'react'
import { Link } from 'react-router-dom'
import Posts from '../components/Posts'

const Landing = () => {
  return (
    <div>
      <h1>USER LANDING PAGE</h1>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/landing">Home</Link>
      </nav>
      <Posts />
    </div>
  )
}

export default Landing
