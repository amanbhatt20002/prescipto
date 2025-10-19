import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="bg-white w-64 min-h-screen shadow-md border-r border-gray-200 p-4">
      {aToken && (
        <ul className="space-y-4">
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={assets.home_icon} alt="" className="w-6 h-6" />
            <p className="font-medium text-sm sm:text-base">Dashboard</p>
          </NavLink>

          <NavLink
            to={'/all-apointments'}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
            <p className="font-medium text-sm sm:text-base">Appointment</p>
          </NavLink>

          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={assets.add_icon} alt="" className="w-6 h-6" />
            <p className="font-medium text-sm sm:text-base">Add Doctor</p>
          </NavLink>

          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={assets.people_icon} alt="" className="w-6 h-6" />
            <p className="font-medium text-sm sm:text-base">Doctor List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
