import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>User is not logged in</div>;
  }

  return (
    <div className="font-sans mt-10">
      <Helmet>
        <title>My Profile | Discount PRO</title>
      </Helmet>

      {/* Cover Section */}
      <div
        className="rounded-xl bg-cover bg-center h-64 flex justify-center items-center text-white text-3xl shadow-lg"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/d2KkcGW/Welcome-1.jpg')",
        }}
      >
        <h1 className="px-3 py-2 rounded-lg bg-white text-blue-500">Welcome, {user.displayName}!</h1>
      </div>

      {/* Profile Information Section */}
      <div className="flex justify-center py-8">
        <div className="w-72 p-6 bg-white rounded-lg shadow-lg text-center border">
          {/* User Photo */}
          <img
            src={user.photoURL}
            alt="User Photo"
            className="w-36 h-36 rounded-full object-cover mx-auto mb-4"
          />

          {/* User Name */}
          <h3 className="text-xl font-semibold">{user.displayName}</h3>

          {/* User Email */}
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Update Features Section */}
      <div className="p-6 mt-10 bg-gray-100 rounded-lg mb-10">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Update Your Information</h3>
          <p className="text-gray-700">
            Keep your profile up to date by updating your details.
          </p>
          <Link to="/updateInformation">
            <button className="mt-4 px-6 py-2 btn btn-primary text-white rounded-md focus:outline-none">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
