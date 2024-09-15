'use client';
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './footer.css';

const Footer = () => {
  // Define the animation using react-spring
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 }, // Duration of the animation
  });

  return (
    <animated.footer style={props} className="footer">
      <div className="container">
        <p>2024 My Website</p>
        <p>Follow us on social media</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
    </animated.footer>
  );
};

export default Footer;
