import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContex";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
    const {slotDateFormat}=useContext(AppContext)
  useEffect(() => {
    getDashData();
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex items-center gap-2 bg-white rounded-xl min-w-52  p-4  hover:shadow-md hover:scale-105 transition-all">
            <img src={assets.doctor_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.doctors}
              </p>
              <p className="text-gray-500 text-sm">Doctor</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl min-w-52  p-4  hover:shadow-md hover:scale-105 transition-all">
            <img src={assets.appointment_icon} alt="" className="w-10 h-10" />
            <div className="flex flex-col items-start justify-center w-full overflow-hidden">
              <p className="text-2xl font-semibold text-gray-800 truncate">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm break-words">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl min-w-52  p-4  hover:shadow-md hover:scale-105 transition-all">
            <img src={assets.patients_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>

          <div className="bg-white">
            <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Latest Bookings</p>
            </div>
            <div className="pt-4 border border-t-0">
                {
                  dashData.latestAppointment.map((item,index)=>(
                    <div
                    className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                    
                    key={index}>
                      <img 
                      className="rounded-full w-10"
                      src={item.docData.image} alt="" />
                      <div className="flex-1 text-sm">
                        <p className="text-gray-800 font-medium">{item.docData.name}</p>
                        <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p>
                      </div>
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
                  ))
                }
            </div>


          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
