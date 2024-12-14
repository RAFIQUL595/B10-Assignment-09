import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    
    // Forgot Password
    forgotPassword(email)
      .then(() => {
        toast.success("Password reset email sent. Please check your inbox.");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Error sending password reset email. Please try again.");
      });
  };

  return (
    <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mb-10 mt-10 border">
      <Helmet>
        <title>Forgot Password | Discount PRO</title>
      </Helmet>
      <form onSubmit={handleResetPassword} className="card-body">
        <h2 className="text-center text-2xl text-blue-400">Forgot Password</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Enter your email <span className="text-red-600">*</span></span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-lg">Send Reset Link</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
