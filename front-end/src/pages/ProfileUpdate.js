import React, { useState, useEffect } from "react";
import axios from "axios";
import { getProfile } from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../components/ImageUpload";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    experience: "",
    profileImage: "",
    saved: "",
  });

  useEffect(() => {
    getProfile().then(setFormData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const newData = { ...formData };
    try {
      const updatedData = await axios.put("api/profile", newData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/profile");
      console.log("UPDATED PROFILE DATA - ", updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const handleImageUrl = (url) => {
    setFormData({ ...formData, profileImage: url });
  };

  return (
    <div className="form-section">
      <div className="header-container">
        <h1 className="heading-profile">Update Profile</h1>
      </div>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className="update-form-container">
          <div className="profile-form-container">
            <textarea
              placeholder="Enter a bio"
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <textarea
              placeholder="Enter your skills"
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
            <textarea
              placeholder="Enter your experience"
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>
          <ImageUpload
            className="image-field"
            value={formData.profileImage}
            name="profileImage"
            onChange={handleChange}
            handleImageUrl={handleImageUrl}
          />
        </div>
          <input className="update-cta" type="submit" value="Confirm Update" />
      </form>
    </div>
  );
};

export default ProfileUpdate;
