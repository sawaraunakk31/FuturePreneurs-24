'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-left">
 main
          <animated.h1 style={headingSpring} className="footer-heading">
            Ecell - We Breed Business
          </animated.h1>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-link">
              <animated.div style={iconSpring}>
                <FontAwesomeIcon icon={faFacebook} className="social-icon" />
              </animated.div>
              <span className="social-name">Facebook</span>
            </a>
            <a href="#" aria-label="Twitter" className="social-link">
              <animated.div style={iconSpring}>
                <FontAwesomeIcon icon={faTwitter} className="social-icon" />
              </animated.div>
              <span className="social-name">Twitter</span>
            </a>
            <a href="#" aria-label="Instagram" className="social-link">
              <animated.div style={iconSpring}>
                <FontAwesomeIcon icon={faInstagram} className="social-icon" />
              </animated.div>
              <span className="social-name">Instagram</span>
            </a>
            <a href="#" aria-label="LinkedIn" className="social-link">
              <animated.div style={iconSpring}>
                <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" />
              </animated.div>
              <span className="social-name">LinkedIn</span>
            </a>
          </div>


main
          <div className="contact-info">
            <p>Email: <a href="mailto:helloecellvit@gmail.com">helloecellvit@gmail.com</a></p>
            <p>Phone: <a href="tel:+916306311799">+91 6306311799</a></p>
          </div>
        </div>
        <div className="footer-right">
        <div className="social-links">
        <div className="footer-right">
  <div className="social-links">
    <a href="https://www.facebook.com/ecellvit/" className="social-link" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faFacebook} className="social-icon" />
    </a>
    <a href="https://x.com/i/flow/login?redirect_after_login=%2Fecell_vit" className="social-link" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faTwitter} className="social-icon" />
    </a>
    <a href="https://www.instagram.com/ecell_vit/"  className="social-link" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faInstagram} className="social-icon" />
    </a>
    <a href="https://www.linkedin.com/company/ecellvitvellore"  className="social-link" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" />
    </a>
  </div>
</div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
