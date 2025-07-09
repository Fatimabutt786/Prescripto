import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../Components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors,getDoctorsData,token,backendUrl,currencySymbol } = useContext(AppContext)
const navigate = useNavigate()
  const [docInfo, setdocInfo] = useState(null)
  const [docSlots, setdocSlot] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')
  const daysofweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getAvailableSlot = async () => {
    setdocSlot([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let timeSlots = []
      let start = new Date()
      start.setDate(today.getDate() + i)

      let end = new Date()
      end.setDate(today.getDate() + i)
      end.setHours(21, 0, 0, 0) // 9:00 PM

      if (i === 0) {
        // Today
        const now = new Date()
        let hour = now.getHours()
        let minute = now.getMinutes()

        if (hour >= 21 || (hour === 20 && minute >= 30)) {
          // After 8:30 PM – no slots for today
          setdocSlot(prev => [...prev, []])
          continue
        }

        if (minute >= 30) {
          hour += 1
          minute = 0
        } else {
          minute = 30
        }

        start.setHours(hour)
        start.setMinutes(minute)
        start.setSeconds(0)
        start.setMilliseconds(0)
      } else {
        // Future days: 10:00 AM
        start.setHours(10, 0, 0, 0)
      }

      while (start < end) {
        let formattedTime = start.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
   let day = start.getDate()
   let month = start.getMonth()+1
   let year = start.getFullYear()
      const slotDate = day+"_"+month+"_"+year
      const slotTime = formattedTime

      const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotTime] ?false:true;
      if(isSlotAvailable){
          timeSlots.push({
          datetime: new Date(start),
          time: formattedTime,
        })
      }
        

        start.setMinutes(start.getMinutes() + 30)
      }

      setdocSlot(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment= async () =>{
       if(!token){
      toast.warn("Login to book appointment")
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime
let day = date.getDate()
let month = date.getMonth()+1;
let year = date.getFullYear()

const slotDate = day + "_" +month+"_"+year
const {data} = await axios.post(backendUrl + '/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
if(data.success){
  toast.success(data.message)
  getDoctorsData()
  navigate('/my-appointments')
}else{
  toast.error(data.message)
}
    
    } catch (error) {
      console.log(error)
        toast.error(error.message)
      
    }
   

  }

  useEffect(() => {
    getAvailableSlot()
  }, [docInfo])

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setdocInfo(docInfo)
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  return (
    docInfo && (
      <div>
        {/* doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="img" />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-600">
              {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <p>{docInfo.degree} - {docInfo.speciality}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm text-gray-900 mt-3 font-medium">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fee}</span>
            </p>
          </div>
        </div>

        {/* booking slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => {
                const date = new Date()
                date.setDate(date.getDate() + index)
                const day = daysofweek[date.getDay()]
                const dateNum = date.getDate()

                return (
                  <div
                    key={index}
                    onClick={() => item.length > 0 && setslotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index ? 'bg-primary text-white' : 'border border-gray-600'
                    }`}
                  >
                    <p>{day}</p>
                    <p>{dateNum}</p>
                    {item.length === 0 && <p className="text-xs text-red-500 ">No slots</p>}
                  </div>
                )
              })}
          </div>
          <div className="flex items-center gap-3 w-full mt-4 overflow-x-scroll ">
            {docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>setslotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full
              cursor-pointer ${item.time === slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300'} `} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button onClick={bookAppointment} className='bg-primary mt-4 text-white text-sm font-light px-14
          py-3 rounded-full'>Book an appointment</button>
        </div>
{/* listing related doctors */}
<RelatedDoctors docId={docId} speciality={docInfo.speciality} />

      </div>
    )
  )
}

export default Appointment
