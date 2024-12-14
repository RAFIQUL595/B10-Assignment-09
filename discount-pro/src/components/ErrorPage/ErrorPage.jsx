import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Helmet>
        <title>
        404 – Page Not Found. Yet.
        </title>
      </Helmet>
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Page Not Found</p>
      <button
        onClick={goToHome}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
