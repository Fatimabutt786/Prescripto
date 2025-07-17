import React, { useContext, useEffect } from "react";
import { DocotorContext } from "../../Context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken, cancelAppointment } = useContext(DocotorContext);
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3 ">
 
          <div
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100
        hover:scale-105 transition-all "
          >
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div >
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className=" text-gray-400">Appointments</p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100
        hover:scale-105 transition-all "
          >
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className=" text-gray-400">patients</p>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments?.map((item, index) => (
              <div key={index} className="flex items-center px-6 py-3 gap-3 hover:bg-gray-300">
                <img className="rounded-full w-10" src={item.docData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-600">{item.slotDate}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    className="w-10 cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
