import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContex";
import { assets } from "../../assets/assets";
const AllApointment = () => {
  const { aToken, appointments, getAllAppointments ,cancelAppointment} = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currencySymbol } =
    useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div class="p-6 bg-gray-50">
      <p class="text-xl font-semibold text-gray-800 mb-4">All Appointments</p>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <div className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] bg-gray-100 font-semibold text-gray-700 text-sm px-6 py-3 border-b">
          <p className="text-center">Sno.</p>
          <p className="text-center">Patient</p>
          <p className="text-center">Age</p>
          <p className="text-center">Date</p>
          <p className="text-center">Doctor</p>
          <p className="text-center">Fees</p>
          <p className="text-center">Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b hover:bg-gray-50 text-sm text-gray-700 transition-colors"
          >
            <p className="text-center max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-3">
              <img
                src={item.userData.image}
                alt=""
                className="w-8 h-8 rounded-full object-cover border"
              />
              <p className="font-medium">{item.userData.name}</p>
            </div>

            <p className="text-center max-sm:hidden">
              {calculateAge(item.userData.dob)}
            </p>

            <p className="text-center">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className="flex items-center gap-3 justify-center">
              <img
                src={item.docData.image}
                alt=""
                className="w-8 h-8 rounded-full object-cover border bg-gray-100"
              />
              <p className="font-medium">{item.docData.name}</p>
            </div>

            <p className="text-center font-medium">
              {currencySymbol}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : (
              <img
                onClick={()=>cancelAppointment(item._id)}
                className="cursor-pointer mx-auto w-8 opacity-70 hover:opacity-100 transition"
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllApointment;
