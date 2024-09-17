'use client';
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './footer.css';

const Footer = () => {
  const footerSpring = useSpring({
    opacity: 1,
    from: { opacity: 10 },
    config: { duration: 500 },
  });

  const iconSpring = useSpring({
    transform: 'translateY(0px)',
    from: { transform: 'translateY(-10px)' },
    config: { tension: 200, friction: 12 },
    reset: true,
    loop: { reverse: true },
  });

  const headingSpring = useSpring({
    transform: 'scale(1.2)',
    from: { transform: 'scale(1)' },
    config: { tension: 150, friction: 10 },
    reset: true,
    reverse: true,
    loop: { reverse: true },
  });

  return (
    <animated.footer style={footerSpring} className="footer">
      <div className="container">
        <div className="footer-left">
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
          <div className="contact-info">
            <p>Email: <a href="mailto:helloecellvit@gmail.com">helloecellvit@gmail.com</a></p>
            <p>Phone: <a href="tel:+916306311799">+91 6306311799</a></p>
          </div>
        </div>
      </div>
    </animated.footer>
  );
};

export default Footer;
