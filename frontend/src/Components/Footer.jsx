import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14
      my-10 mt-40 text-sm">
        {/* left section */}
        <div className="">
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur
                 adipisicing elit. Assumenda fugiat pariatur eveniet. Odio iste nam error sint quasi rerum quibusdam accusamus aut quae, cumque non amet accusantium beatae aspernatur exercitationem.</p>
        </div>
         {/* center section */}
        <div className="d">
           <p className='text-xl font-medium mb-5'>COMPANY</p>
           <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
           </ul>
        </div>
         {/* right section */}
        <div className='flex flex-col gap-2 text-gray-600'>
            <p className='text-xl font-medium mb-5 text-black'>GET IN TOUCH</p>
           <ul>
            <li>+1-22-456-7890</li>
            <li>greatestak@gmail.com</li>
           </ul>
        </div>
      </div>
      <div>
        {/* copyright text */}
      <hr  />
      <p className='py-5 text-sm text-center'>CopyRight@2025 Prescripto - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
