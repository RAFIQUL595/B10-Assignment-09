import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TrendingDeals = () => {
  React.useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const trendingDeals = [
    {
      id: 1,
      title: "50% Off on Electronics",
      brand: "Bagdoom",
      image: "https://i.ibb.co.com/D4tfKJv/50-Off-on-Electronics.jpg",
      description:
        "Great deals on electronics! Don't miss out on the opportunity.",
      expiration: "2 Days Left",
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free",
      brand: "Aarong",
      image: "https://i.ibb.co.com/YyX5NR1/Buy-1-Get-1-Free.jpg",
      description: "Add this amazing offer to upgrade your stylish collection.",
      expiration: "5 Hours Left",
    },
    {
      id: 3,
      title: "৳200 Off on Home Items",
      brand: "Chaldal",
      image: "https://i.ibb.co.com/ts6DZSc/200-Off-on-Home-Items.jpg",
      description: "Shop for essential home products and get huge discounts.",
      expiration: "Ends Tomorrow",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg mb-5">
      <h2 className="text-3xl font-bold text-center mb-8">
        Trending Deals of the Week
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingDeals.map((deal) => (
          <div
            key={deal.id}
            data-aos="fade-up"
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">
              {deal.title}
            </h3>
            <p className="text-gray-600 text-center mb-2">
              <span className="font-bold">{deal.brand}</span>
            </p>
            <p className="text-gray-500 text-center mb-4">{deal.description}</p>
            <p className="text-red-500 text-center mb-4 font-medium">
              {deal.expiration}
            </p>
            <button className="flex mx-auto"><a
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg block hover:bg-blue-600 transition"
              aria-label={`Redeem deal: ${deal.title}`}
            >
              Redeem Now
            </a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingDeals;
