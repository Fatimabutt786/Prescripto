import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { assets } from '../../assets/assets'

const Allappointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className="bg-white border rounded min-h-[60vh] text-sm max-h-[80vh] overflow-y-scroll">

        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-semibold bg-gray-50">
          <p>#</p>
          <p>Patient</p>
       
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b items-center text-gray-600 hover:bg-gray-100'
          >
            {/* Index */}
            <p className='max-sm:hidden'>{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={item.userData?.image || '/placeholder.png'}
                alt="Patient"
              />
              <p>{item.userData?.name || 'N/A'}</p>
            </div>

          

            {/* Date & Time */}
            <div>
              <p>{item.slotDate.replace(/_/g, '/')}</p>
              <p className='text-xs text-gray-400'>{item.slotTime}</p>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-2">
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={item.docData?.image || '/doctor-placeholder.png'}
                alt="Doctor"
              />
              <p>{item.docData?.name || 'N/A'}</p>
            </div>

            {/* Fees */}
            <p>{item.docData?.fee ? `Rs ${item.docData.fee}` : '-'}</p>

            {/* Actions */}
            {
              item.cancelled 
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} className='w-10 cursor-pointer' />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allappointments
