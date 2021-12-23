import React, { useState, useEffect } from "react";
import ProfileForm from "../components/ProfileForm";
import { getProfile } from "../helpers/api";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    getProfile().then(setProfileInfo);
  }, []);

  return (
    <div>
      <nav className="landing-nav">
        <Link to="/landing">Home</Link>
        <Link to={`/map`}>Map</Link>
        <Link to={`/add`}>Add Your Post</Link>
      </nav>
      <div className="heayarn">
        <h1 className="heading-profile">Profile</h1>
      </div>
      {profileInfo ? (
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-image">
              <img src={profileInfo.profileImage} />
            </div>
            <div className="profile-text">
              <p>About Me: {profileInfo.bio}</p>
              <p>My Skills: {profileInfo.skills}</p>
              <p>Experience: {profileInfo.experience}</p>
            </div>
          </div>
          <Link className="update-cta" to="/update-profile">
            Update My Profile
          </Link>
        </div>
      ) : (
        <div>
          <ProfileForm />
        </div>
      )}
    </div>
  );
};

export default Profile;
