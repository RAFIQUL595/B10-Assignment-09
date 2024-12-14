// src/pages/UpdateInformation.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { AuthContext } from "../AuthProvider/AuthProvider";


const UpdateInformation = () => {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    // Ensure both name and photo URL are provided (no validation for photo URL format)
    if (!name || !photoURL) {
      toast.error("Name and Photo URL are required.");
      return;
    }

    // Proceed with the update
    updateUser(name, photoURL)
      .then(() => {
        toast.success("User information updated successfully!");
        navigate("/myprofile");
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
        toast.error("Failed to update user information.");
      });
  };

  return (
    <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-10 mt-10 border">
      <Helmet>
        <title>Update Information | Discount PRO</title>
      </Helmet>
      <form className="card-body" onSubmit={handleUpdate}>
        <h2 className="text-center text-2xl text-blue-400">
          Update Your Information
        </h2>

        {/* Photo URL */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Enter Photo URL <span className="text-red-600">*</span></span>
          </label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter photo URL"
            className="input input-bordered"
            required
            aria-label="Photo URL"
          />
        </div>

        {/* Name */}
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text text-lg">Enter Your Name <span className="text-red-600">*</span></span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="input input-bordered"
            required
            aria-label="Name"
          />
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary text-lg">
            Update Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInformation;
