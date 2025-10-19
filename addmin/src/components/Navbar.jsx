import React, { use, useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken,setAToken } = useContext(AdminContext);
  const navigate =useNavigate()
  const logout=()=>{
    navigate("/")
    aToken && setAToken("")
    aToken && localStorage.removeItem("aToken")

  }

  return (
    <nav className="flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-10 py-3 bg-white shadow-md border-b border-gray-200">
      {/* Left side: logo + role */}
      <div className="flex items-center space-x-3 mb-2 sm:mb-0">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-32 h-8 sm:w-40 cursor-pointer"
        />
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Right side: logout button */}
      <button onClick={logout}

        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
