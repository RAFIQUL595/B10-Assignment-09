import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const MainLayOut = () => {
  return (
    <div>
      <header className="border shadow-md">
        <div className="w-11/12 mx-auto">
          <Header></Header>
        </div>
      </header>
      <main className="w-11/12 mx-auto">
        <div className="ml-6 lg:min-h-[370px]">
          <Outlet></Outlet>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayOut;
