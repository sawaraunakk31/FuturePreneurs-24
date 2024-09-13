"use client";
import { useState, useEffect } from 'react'; 

const Loading = () => (
  <div style={styles.overlay}>
    <div style={styles.spinner}></div>
  </div>
);

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, 
  },
  spinner: {
    border: '16px solid #f3f3f3', /* Light grey */
    borderTop: '16px solid #1aab03', /* Green */
    borderRadius: '40%',
    width: '80px',
    height: '80px',
    animation: 'spin 2s linear infinite',
  },
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  }
};

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 900000); // Adjust the delay as needed
  }, []);

  return (
    <>
      {loading ? <Loading /> : <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
