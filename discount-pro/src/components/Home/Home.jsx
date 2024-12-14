import React from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import Banner from "../Banner/Banner";
import TopBrands from "../TopBrands/TopBrands";
import BrandsOnSell from "../BrandsOnSell/BrandsOnSell";
import TrendingDeals from "../TrendingDeals/TrendingDeals";
import ReviewSection from "../ReviewSection/ReviewSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Discount PRO</title>
      </Helmet>
      <Banner></Banner>
      <TopBrands></TopBrands>
      <BrandsOnSell></BrandsOnSell>
      <TrendingDeals></TrendingDeals>
      <ReviewSection></ReviewSection>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
