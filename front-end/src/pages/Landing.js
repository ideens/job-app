import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Posts from '../components/Posts'
import { getCurrentUser } from '../helpers/api'

const Landing = ({ id }) => {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getCurrentUser().then(setUserName)
  }, [])

  return (
    <div>
      <h1>TECHANIC</h1>
      <h2>Hi,{userName}</h2>
      <nav className="landing-nav">
        <Link to={`/profile`}>Profile</Link>
        <Link to="/landing">Home</Link>
        <Link to={`/map`}>Map</Link>
        <Link to={`/add`}>Add Your Post</Link>
      </nav>
     


 
    <Posts />
    </div>
  )
}

export default Landing
