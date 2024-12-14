import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import FadeLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex justify-center">
        <FadeLoader color="#36d7b7" loading={true} size={80} />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivetRouter;
