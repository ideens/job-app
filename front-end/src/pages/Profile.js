import React, { useState, useEffect } from 'react'
import ProfileForm from '../components/ProfileForm'
import { getProfile } from '../helpers/api'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({})
  useEffect(() => {
    getProfile().then(setProfileInfo)
  }, [])

  return (
    <div>
      <h1>profile</h1>
      <div>
        {profileInfo ? (
          <div>
            <p>About me: {profileInfo.bio}</p>
            <p>My skills: {profileInfo.skills}</p>
            <p>Experience: {profileInfo.experience}</p>
            <Link to="/update-profile">Update</Link>
          </div>
        ) : (
          <div>
            <ProfileForm />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
