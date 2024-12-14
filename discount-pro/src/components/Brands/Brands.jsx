import React, { useContext, useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Brands = () => {
  const { data, user, loading, error } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Initialize AOS and refresh on data change
  useEffect(() => {
    AOS.init({ duration: 800 });
    AOS.refresh();
  }, [data, search]);  

  const handleRedirect = (brandId) => {
    if (user) {
      navigate(`/brands/${brandId}`);
    } else {
      navigate("/login");
    }
  };

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(
    () =>
      data?.filter((d) =>
        d.brand_name.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <Helmet>
        <title>Brands | Discount PRO</title>
      </Helmet>

      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
        Brands
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search brands"
          className="w-3/4 md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-400"
        />
      </div>

      {/* Brands List */}
      <div className="flex flex-col items-center space-y-6">
        {filteredData?.length ? (
          filteredData.map((brand) => (
            <div
              key={brand._id}
              className="w-3/4 md:w-1/2 bg-white rounded-lg shadow-lg p-6 border"
              data-aos="fade-up" // AOS animation for each brand card
            >
              <div>
                <img
                  src={brand.brand_logo}
                  alt={`${brand.brand_name} Logo`}
                  className="w-full h-48 rounded-xl mb-5"
                />
                <div className="text-center space-y-2 relative">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {brand.brand_name}
                    <div className="flex absolute left-0 -top-1 items-center justify-end space-x-1 mt-2">
                      <span className="text-yellow-400 text-lg">★</span>
                      <p className="text-gray-700">{brand.rating}</p>
                    </div>
                  </h2>
                  <p className="text-gray-600">{brand.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 relative">
                {brand.isSaleOn && (
                  <div className="absolute -top-72 right-0 text-white animate-bounce px-2 py-1 font-bold border bg-red-500">
                    Sale is on!
                  </div>
                )}
              </div>

              {/* View Coupons Button */}
              <div className="flex justify-center items-center">
                <button
                  onClick={() => handleRedirect(brand._id)}
                  className="btn btn-primary text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                >
                  {user ? "View Coupons" : "View Coupons"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No brands found.</p>
        )}
      </div>
    </div>
  );
};

export default Brands;
