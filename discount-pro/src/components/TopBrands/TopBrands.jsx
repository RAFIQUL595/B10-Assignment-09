import React, { useContext } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const TopBrands = () => {
  const { data } = useContext(AuthContext);
  const navigate = useNavigate();

  //  logo takes the user to the brand / brand details  route
  const handleLogoClick = (brandId) => {
    if (brandId) {
      navigate(`/brands/${brandId}`);
    } else {
      console.error("No brand ID specified.");
    }
  };

  return (
    <div className="top-brands-container py-8 bg-gray-50 mb-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Top Brands
      </h1>
      {data && data.length > 0 ? (
        //  React Fast Marquee
        <Marquee
          pauseOnHover={true}
          speed={50}
          gradient={false}
          className="brand-marquee"
        >
          {data.map((brand) => (
            <div
              key={brand._id}
              className="brand-logo flex justify-center items-center mx-6"
              onClick={() => handleLogoClick(brand._id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={brand.brand_logo}
                alt={brand.brand_name}
                className="w-24 h-auto"
              />
            </div>
          ))}
        </Marquee>
      ) : (
        <p className="text-center text-gray-600">No top brands available.</p>
      )}
    </div>
  );
};

export default TopBrands;
