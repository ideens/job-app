import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Posts from '../components/Posts'
import { getCurrentUser } from '../helpers/api'
import { signOut } from '../helpers/auth'

import blueLogo from '../assets/bluelogo.png'

const Landing = ({ id }) => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getCurrentUser().then(setUserName)
  }, [])

  const navigate = useNavigate()

  const logOut = () => {
    navigate('/')
  }
  return (
    <div>
      <div className="header-contain">
        <img src={blueLogo} />
        <h1>TECHANIC</h1>
      </div>
      <h2>Hi, {userName}!</h2>
      <nav className="landing-nav">
        <Link to={`/profile`}>Profile</Link>
        <Link to={`/home`}>Home</Link>
        <Link to={`/map`}>Map</Link>
        <Link to={`/add`}>Add Your Post</Link>
      </nav>
      <button
        className="sign-out-left"
        onClick={() => {
          signOut()
          logOut()
        }}
      >
        Sign Out
      </button>
      <Posts />
    </div>
  )
}

export default Landing
