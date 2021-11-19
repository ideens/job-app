import React from 'react'
import { Link } from 'react-router-dom'

import projectImage from '../assets/project.jpeg'
import collabImage from '../assets/collab.jpeg'
import mapImage from '../assets/map.jpeg'



const Home = () => {
  return (
    <div>
      <h1>TECHANIC</h1>
      <h2>
      Meet, collab and socialise, all in one place!
      Techanic was created as an all-in-one platform to find and meet collaborators.
      </h2>
      <nav>
        <Link className='register-button' to="/register">Register</Link>
        <Link className='login-button' to="/login">Login</Link>
      </nav>
      <section>
        <div className='section-cards'>
          <h3>
          Create your project brief

          </h3>
          <p>
          Specify your project brief with a few clicks and get matched instantly.
          </p>
          <img src={projectImage}/>
        </div>
     
        <div className='section-cards'>
          <h3>
          Collaborate With Other Developers

          </h3>
          <p>
          View the profiles and connect with other freelancers based on your interests.
          </p>
          <img src={collabImage}/>

        </div>
     
     
        <div className='section-cards'>
          <h3>
          View Local Projects
          </h3>
          <p>
         Checkout our map! You can see all projects based on location
          </p>
          <img src={mapImage}/>

        </div>
     
      </section>
      
    </div>
  )
}

export default Home
