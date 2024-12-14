import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";

const BrandsOnSell = () => {
  const { data, isLoading, error } = useContext(AuthContext);

  React.useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return <p className="text-center text-red-500">Failed to load brands!</p>;
  }

  // Checked isSaleOn is true
  const brandsOnSale = data.filter((brand) => brand.isSaleOn);

  return (
    <div className="p-6 bg-gray-100 rounded-lg mb-5">
      <h1 className="text-3xl font-bold text-center mb-8">Brands On Sale</h1>
      {brandsOnSale.length === 0 ? (
        <div className="text-center">
          <img
            src="/path-to-no-sale-illustration.png"
            alt="No brands on sale"
            className="w-48 mx-auto mb-4"
          />
          <p className="text-gray-500">No brands on sale currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandsOnSale.map((brand, index) => (
            <div
              key={index}
              data-aos="zoom-in-right"
              className="bg-white rounded-xl p-4 border shadow-lg transition"
            >
              {/* brand Logo */}
              <img
                src={brand.brand_logo}
                alt={`${brand.brand_name} logo`}
                className="w-full h-24 mx-auto mb-4 object-contain"
              />
              <div className="space-y-3">
                {/*  brand Name */}
                <h2 className="text-xl font-semibold text-center mb-2">
                  {brand.brand_name}
                </h2>

                {/* Checked Total Coupons */}
                <p className="text-gray-600 text-center mb-2">
                  <span className="font-bold">Coupons:</span>{" "}
                  {brand.coupons.length}
                </p>

                {/* Category */}
                <p className="text-center pt-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full font-bold">
                    {brand.category}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandsOnSell;
