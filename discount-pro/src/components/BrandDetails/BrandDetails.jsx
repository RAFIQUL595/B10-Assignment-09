import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
  </div>
);

const BrandDetails = () => {
  const { brandId } = useParams();
  const { data } = useContext(AuthContext);
  const [copiedCode, setCopiedCode] = useState(null);
  const [loading, setLoading] = useState(true);

  const brand = data?.find((b) => b._id === brandId);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const handleCopy = (code) => {
    try {
      setCopiedCode(code);
      toast.success(`Coupon code "${code}" copied!`, {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => setCopiedCode(null), 3000);
    } catch (error) {
      toast.error("Failed to copy coupon code.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!brandId) {
    return <p className="text-gray-600">Invalid Brand ID</p>;
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Brand not found.</p>
      </div>
    );
  }

  return (
    <div className="mb-5 rounded-xl mt-10 bg-gray-100 py-8">
      <Helmet>
        <title>Brand Details | Discount PRO</title>
      </Helmet>
      <div className="text-center mb-6">
        <img
          src={brand.brand_logo}
          alt={`${brand.brand_name} logo`}
          className="w-24 h-24 mx-auto rounded-full"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            {brand.brand_name}
          </h1>
          <p className="text-yellow-500 font-medium">
            Rating: {brand.rating}/5
          </p>
          <p className="text-gray-600 mt-2">{brand.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:w-4/6 lg:mx-auto gap-6 px-4">
        {brand.coupons?.length ? (
          brand.coupons.map((coupon) => (
            <div
              key={coupon._id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {coupon.coupon_code}
              </h2>
              <p className="text-gray-600">{coupon.description}</p>
              <p className="text-green-600 font-medium mt-2">
                {coupon.coupon_type === "Discount"
                  ? `Discount: ${coupon.condition}`
                  : coupon.coupon_type === "Cashback"
                  ? `Cashback: ₹${coupon.condition}`
                  : `Sale: ${coupon.condition}`}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <CopyToClipboard
                  text={coupon.coupon_code}
                  onCopy={() => handleCopy(coupon.coupon_code)}
                >
                  <button
                    aria-label={`Copy coupon code for ${coupon.coupon_code}`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Copy Code
                  </button>
                </CopyToClipboard>
                <button
                  onClick={() =>
                    window.open(
                      brand.shop_Link,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Use Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">
            No coupons available.
          </p>
        )}
      </div>

      {copiedCode && (
        <div className="mt-6 p-4 bg-blue-100 text-blue-600 rounded-md text-center">
          Coupon code <strong>{copiedCode}</strong> copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default BrandDetails;
