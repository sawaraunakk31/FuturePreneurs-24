'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-left">
          <div className="contact-info">
            <p>Email: <a href="mailto:helloecellvit@gmail.com">helloecellvit@gmail.com</a></p>
            <p>Phone: <a href="tel:+916306311799">+91 6306311799</a></p>
          </div>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a href="https://www.facebook.com/ecellvit/" aria-label="Facebook" className="social-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
              <span className="social-name">Facebook</span>
            </a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fecell_vit" aria-label="Twitter" className="social-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="social-icon" />
              <span className="social-name">Twitter</span>
            </a>
            <a href="https://www.instagram.com/ecell_vit/" aria-label="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
              <span className="social-name">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/company/ecellvitvellore" aria-label="LinkedIn" className="social-link" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" />
              <span className="social-name">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
