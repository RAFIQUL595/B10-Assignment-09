import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { handelLogin, handelGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handelLoginFrom = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Get the currently signed-in user
    handelLogin(email, password)
      .then((result) => {
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed. Please check your credentials.");
      });
  };
  
  // Google Login
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
    <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-10 mt-10 border">
      <Helmet>
        <title>Login | Discount PRO</title>
      </Helmet>
      <form onSubmit={handelLoginFrom} className="card-body">
        <h2 className="text-center text-2xl text-blue-400">Login From</h2>
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
            <span className="label-text text-lg">Password <span className="text-red-600">*</span></span>
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
            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            className="absolute top-3/4 right-3 transform -translate-y-1/2"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <label className="label">
          <Link
            to="/forgotPassword"
            className="label-text-alt link link-hover text-lg"
          >
            Forgot password?
          </Link>
        </label>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-lg">Login</button>
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
            Don't have an account?
            <Link to="/register" className="link text-blue-500 ml-1">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
