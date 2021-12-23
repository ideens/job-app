import axios from "axios";
import React, { useState } from "react";
import { ImageUpload } from "./ImageUpload";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    experience: "",
    profileImage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post("api/me/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("PROFILE DATA - ", data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrl = (url) => {
    setFormData({ ...formData, profileImage: url });
  };

  return (
    <div className="form-section">
      <div>
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
              handleImageUrl={handleImageUrl}
            />
          </div>
          <input className="add-cta" type="submit" value="Add profile" />
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
