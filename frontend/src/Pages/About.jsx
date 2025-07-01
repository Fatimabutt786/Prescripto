import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='flex gap-10 flex-col md:flex-row'>
      <div className="my-10 flex flex-col md:flex-row gap-5">
        <img className='w-full   md:max-w-[320px]' src={assets.about_image} alt="" />
        
      </div>
      <div className="flex flex-col justify-center gap-6 md:w-2/4
      text-sm text-gray-600 ">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos placeat inventore vel nihil totam eius incidunt. Aliquam quos fugit similique temporibus omnis iusto, quidem sint atque et reprehenderit at ipsum.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt fugiat quasi, accusamus libero magni iste iure consequuntur quia temporibus, nam sunt omnis recusandae itaque totam adipisci sit. Commodi, dolore consequuntur?
        </p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ipsa magnam nihil eaque. Ad beatae mollitia maxime sunt, consequuntur unde modi aliquam sed, id, at rem cupiditate excepturi nulla culpa.</p>
      </div></div>
      <div className="text-xl my-4">
        <p className='uppercase'>Why <span className='text-gray-700 font-semibold'>Choose Us</span></p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt assumenda cupiditate optio? Ab blanditiis exercitationem accusamus! In sint ea at ad ratione ut aperiam sunt provident dolores, itaque explicabo quod!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
           <b>Convinience</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, facilis ullam officiis fugiat possimus doloribus ipsa alias, earum corporis neque dolores id nemo dolorum odit exercitationem quia porro repellat consequatur!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
           <b>Personalization</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure similique libero a assumenda veniam velit fuga adipisci corrupti doloribus natus, enim cupiditate pariatur dolorem dolore provident voluptatibus quos, error ipsam.</p>
        </div>
      </div>
    </div>
  )
}

export default About
