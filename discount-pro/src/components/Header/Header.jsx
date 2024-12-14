import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaTags, FaInfoCircle } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const links = (
    <>
      <li className="text-lg md:mr-4">
        <NavLink to="/">
          <IoHome /> Home
        </NavLink>
      </li>
      <li className="text-lg md:mr-4">
        <NavLink to="/brands">
          <FaTags /> Brands
        </NavLink>
      </li>
      {user && (
        <li className="text-lg md:mr-4">
          <NavLink to="/myprofile">
            <CgProfile /> My Profile
          </NavLink>
        </li>
      )}
      <li className="text-lg">
        <NavLink to="/aboutdev">
          <FaInfoCircle /> About Dev
        </NavLink>
      </li>
    </>
  );

  return (
    <nav>
      <div className="navbar py-5 mt-2">
        <div className="navbar-start gap-3">
          {/* Mobile And Tablet Menu Bar */}
          <div className="dropdown -mx-5 md:mx-0">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box w-36 z-[1] mt-3 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center">
            <div>
              {/* Web Site Logo */}
              <img
                className="w-10 md:w-14"
                src={logo}
                alt="Discount PRO Logo"
              />
            </div>

            {/* Web Site Name */}
            <h1 className="font-bold md:text-3xl">
              <span className="text-[#22a6b3]">Discount</span>
              <span className="text-blue-400">PRO</span>
            </h1>
          </div>
        </div>

        {/* Computer NavBar */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        
        {/* Show user picture , email and a Log-Out button */}
        <div className="navbar-end gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-center flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.photoURL}
                  alt={user.displayName}
                />
                <p className="hidden md:block">{user.email}</p>
              </div>
              <button
                onClick={logout}
                className="btn btn-primary text-white px-3 py-2 rounded-xl md:text-lg font-bold"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <button className="text-white btn btn-primary  px-3 py-2 rounded-xl md:text-lg font-bold">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="text-white btn btn-primary  px-3 py-2 rounded-xl md:text-lg font-bold">
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* welcome message with user name  at the center */}
      {user && (
        <div className="text-center py-4">
          <p className="font-bold text-lg">{`Welcome, ${user.displayName}`}</p>
        </div>
      )}
    </nav>
  );
};

export default Header;
