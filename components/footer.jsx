'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './footer.css';
import './phoneicon'
import PhoneIcon from './phoneicon';
import MailIcon from './mailicon';

const Footer = () => {
  return (
    <footer className="bg-[#000000] overflow-hidden box-border">
    <div className="flex flex-col gap-10">
      <div className="flex flex-row text-white flex-grow ">
        <div className="border flex flex-col gap-5 pl-5 pr-5 w-[50vw]">
          <h1 className='text-[5vw] border text-[#F79D68] after:content-["We_Breed_Business"] after:text-[1vw] after:text-[#FFFFFF] flex flex-col gap-0 after:absolute after:t-0 after:pl-[0.4vw] after:mt-[11vh]'>
            E-CELL
          </h1>
          <div className="pl-5 pr-5">
            <div className='flex items-center gap-2'>
              <p><PhoneIcon /></p>
              <a href="tel:+91 87777 93331">+91 87777 93331</a>
            </div>
            <div className='flex items-center gap-2 '>
              <p className='border pt-[0.8vh]'><MailIcon /></p>
              <a href="mailto:helloecellvit@gmail.com">helloecellvit@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center border pl-5 pr-5 w-[50vw]">
          <p className='text-sm flex justify-center align-center border'>
            Entrepreneurship Cell is a Student based Club functioning under Office of Students' Welfare, VIT Vellore which aims at fostering entrepreneurial spirit amongst young aspirants by providing them with a platform and required resources for actuating their ideas into successful business ventures. E-Cell strives to attain an entrepreneurial environment in the campus and believes in taking strides towards establishing an ever-growing, ever-improving Start-Up environment. Our sole approach is to magnify the reach and set up a diverse pool of investors, evaluators, and mentors.
          </p>
        </div>
      </div>
      <div className='w-screen h-[fit-content]'>

      </div>
    </div>
    </footer>
  );
  

          {/* <div className="social-links">
            <div className="footer-right">
              <div className="social-links">
                <a href="https://www.facebook.com/ecellvit/" className="social-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                </a>
                <a href="https://x.com/i/flow/login?redirect_after_login=%2Fecell_vit" className="social-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                </a>
                <a href="https://www.instagram.com/ecell_vit/" className="social-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/company/ecellvitvellore" className="social-link" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" />
                </a>
              </div>
            </div> */}
}

export default Footer;
