import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { handelEmailLog, handelGoogle, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Password validation criteria
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error("Password should contain an uppercase and a lowercase letter.");
      return;
    }

    // Proceed with email registration if the password is valid
    handelEmailLog(email, password)
      .then((result) => {
        toast.success("Registration successful!");
        
        // After registration, update user profile
        updateUser(name, photo)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile. Please try again.");
          });
        event.target.reset();
      })
      .catch((error) => {
        // Handle unique error messages
        let errorMessage;
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered. Try logging in.";
            break;
          case "auth/invalid-email":
            errorMessage = "The email address is not valid. Please check.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak. Use at least 6 characters.";
            break;
          default:
            errorMessage = "Registration failed. Please try again.";
        }
        toast.error(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    handelGoogle()
      .then((result) => {
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Google login failed. Please try again.");
      });
  };

  return (
    <div className="card mx-auto mt-10 border bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-10">
      <Helmet>
        <title>Register | Discount PRO</title>
      </Helmet>
      <form onSubmit={handleRegister} className="card-body">
        <h2 className="text-center text-2xl text-blue-400">Register From</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Name <span className="text-red-600">*</span></span>
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Photo <span className="text-red-600">*</span></span>
          </label>
          <input
            type="text"
            placeholder="photoUrl"
            name="photo"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Email <span className="text-red-600">*</span></span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text text-lg">Password <span className="text-red-600">*</span> </span>
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-3/4 right-3 transform -translate-y-1/2"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="form-control mt-6">
          <button className="btn text-lg btn-primary" type="submit">
            Register
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn text-lg mt-5"
          >
            <FcGoogle className="size-6" /> Register with Google
          </button>
        </div>
        <div className="text-center text-lg mt-4">
          <p>
            Already have an account?
            <Link to="/login" className="text-blue-500 hover:underline ml-1">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
