import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  )
}

export default Home
