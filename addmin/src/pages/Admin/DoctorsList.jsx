import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Doctors List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover bg-indigo-50 group-hover:scale-105 transition-transform duration-300"
            />

            <div className="p-4">
              <p className="text-lg font-medium text-gray-900">{item.name}</p>
              <p className="text-gray-600 mb-4">{item.speciality}</p>

              <div className="flex items-center space-x-3">
                <input
                onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}/>
    
                <p className="text-gray-700 font-medium">
                  {item.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
