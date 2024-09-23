'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faTwitter, faInstagram, faLinkedinIn, faLinkedin,faXTwitter } from '@fortawesome/free-brands-svg-icons';
import './footer.css';
import './phoneicon'
import PhoneIcon from './phoneicon';
import MailIcon from './mailicon';
import Youtubelogo from './youtubelogo';

const Footer = () =>{
  return (
    <footer className="bg-[#000000]  box-sizing " id='footer'>
    <div className="flex flex-col gap-10 sm:hidden md:flex ">
      <div className="flex flex-row text-white flex-grow flex-1">
        <div className=" flex flex-col gap-5 pl-5 pr-5 w-[50vw]">
          <h1 className='pl-10 text-[5vw] text-[#F79D68] font-[700]  after:content-["We_Breed_Business"] after:text-[1vw] after:text-[#FFFFFF] flex flex-col gap-0 after:static leading-[60%] after:pl-[0.4vw] mt-[2vh]'>
            E-CELL
          </h1>
          <div className="pl-10 ">
            <div className='flex items-center gap-2'>
              <p><PhoneIcon /></p>
              <a href="tel:+91 87777 93331">+91 87777 93331</a>
            </div>
            <div className='flex items-center gap-2 '>
              <p className=' pt-[0.8vh]'><MailIcon /></p>
              <a href="mailto:helloecellvit@gmail.com">helloecellvit@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center items-center  pl-5 pr-5 w-[50vw]">
          <p className='text-sm justify-center items-center  flex w-[40vw] text-justify pt-10'>
            Entrepreneurship Cell is a Student based Club functioning under Office of Students' Welfare, VIT Vellore which aims at fostering entrepreneurial spirit amongst young aspirants by providing them with a platform and required resources for actuating their ideas into successful business ventures. E-Cell strives to attain an entrepreneurial environment in the campus and believes in taking strides towards establishing an ever-growing, ever-improving Start-Up environment. Our sole approach is to magnify the reach and set up a diverse pool of investors, evaluators, and mentors.
          </p>
        </div>
      </div>
      <div className=' h-[fit-content] flex justify-around items-center flex-wrap gap-10 mb-5 ml-10 mr-10 '>
      <div className="flex-1 h-[fit-content]  flex flex-col ">
        <div className='border rounded-xl border-b-0 pb-5 p-5'>
          <h1 className='text-[#FFFFFF] text-xl pl-2 items-center pt-2'>INSTAGRAM</h1>
        </div>
          <div className='flex flex-row  flex-1 justify-around gap-5 pl-5 pr-2 border-2 rounded-xl border-t-0 pt-5 pb-2'>
          <a href="https://www.instagram.com/ecell_vit/" className='text-[#FFFFFF] underline text-sm flex items-center' target="_blank" >Stay up to Date</a>
          <a href="https://www.instagram.com/ecell_vit/" className="p-1  border-[#FFFFFF] border-2 rounded-xl flex items-center" style={{Image:'url("@/assests/assests/socialmediaborder.png")'}} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="invert w-10 h-10"  />
          </a>  
            </div>
        </div>
        <div className="min-w-[18vw] h-[fit-content]  flex flex-col flex-1">
          <div className='min-w-[18vw] border rounded-xl border-b-0 pb-5 p-5 '>
            <h1 className='min-w-[18vw] text-[#FFFFFF] text-xl pl-2 items-center pt-2 '>LINKEDIN</h1>
          </div>
          <div className='flex flex-row justify-around gap-5 border-2 pl-5 rounded-xl border-t-0 pt-5 pr-2 pb-2'>
          <a href="https://www.linkedin.com/company/ecellvitvellore" className='text-[#FFFFFF] underline text-sm flex items-center' target="_blank">Lets connect</a>
          <a href="https://www.linkedin.com/company/ecellvitvellore" className="p-1 border-2 border-[#FFFFFF] rounded-xl flex items-center" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} className="invert  w-10 h-10 "  />
          </a>  
            </div>
        </div>
        <div className="min-w-[18vw] h-[fit-content]  flex flex-col flex-1">
          <div className='border rounded-xl border-b-0 pb-5 p-5'>
            <h1 className='text-[#FFFFFF] text-xl pl-2 items-center pt-2 '>YOUTUBE</h1>
          </div>
          <div className='flex flex-row justify-around gap-5 pl-5 border-2 pr-2 rounded-xl border-t-0 pt-5 pb-2' >
          <a href="https://www.youtube.com/@e-cellvit7216" className='text-[#FFFFFF] underline text-sm flex items-center' target="_blank" >Learn with us</a>
          <a href="https://www.youtube.com/@e-cellvit7216" className="p-1 border-2 border-[#FFFFFF] rounded-xl flex items-center " style={{Image:'url("./socialmedia.jsx")'}} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} className="invert  w-10 h-10 "  />
          </a>  
            </div>
        </div>
        <div className="min-w-[18vw] h-[fit-content]  flex flex-col flex-1 ">
          <div className='border rounded-xl border-b-0 pb-5 p-5'>
            <h1 className='text-[#FFFFFF] text-xl pl-2 items-center pt-2'>X</h1>
          </div>
          <div className='flex flex-row justify-around gap-5 pl-5 border-2 rounded-xl border-t-0 pt-5 pr-5 pb-2'>
          <a href="https://twitter.com/ecell_vit" className='text-[#FFFFFF] underline text-sm flex items-center' target="_blank" >Ideas in real time</a>
          <a href="https://twitter.com/ecell_vit" className="p-1 border-2 border-[#FFFFFF] rounded-xl flex items-center" style={{Image:'url("./socialmedia.jsx")'}} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faXTwitter} className="invert w-10 h-10 "/>
          </a>  
            </div>
        </div>
      </div>
    </div>
    <div className="sm:flex md:hidden flex flex-col">
      <div className="flex">
        <div>
          <h1 className='pl-10 text-[5vw] text-[#F79D68] font-[700]  after:content-["We_Breed_Business"] after:text-[1vw] after:text-[#FFFFFF] flex flex-col gap-0 after:static leading-[60%] after:pl-[0.4vw] mt-[2vh]'>
            E-CELL
          </h1>
          </div>
          <div className="pl-10 ">
            <div className='flex items-center gap-2'>
              <p><PhoneIcon /></p>
              <a href="tel:+91 87777 93331">+91 87777 93331</a>
            </div>
            <div className='flex items-center gap-2 '>
              <p className=' pt-[0.8vh]'><MailIcon /></p>
              <a href="mailto:helloecellvit@gmail.com">helloecellvit@gmail.com</a>
            </div>
      </div>
      <div className="flex"></div>
    </div>
    </div>
    </footer>
);
}

export default Footer;
