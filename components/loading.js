// "use client";
// import { useState, useEffect } from 'react'; 

// const Loading = () => (
//   <div style={styles.overlay}>
//     <div style={styles.spinner}></div>
//   </div>
// );

// const styles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw', // 100% of viewport width
//     height: '100vh', // 100% of viewport height
//     backgroundColor: 'rgba(0, 0, 0, 1)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999, 
//   },
//   spinner: {
//     border: '1.0vw solid #f3f3f3', /* Light grey */
//     borderTop: '1.3vw solid #039aab', /* Blue */
//     borderRadius: '50%',
//     width: '8vw', // 8% of viewport width
//     height: '8vw', // 8% of viewport height (keeping it circular)
//     animation: 'spin 2s linear infinite',
//   },
//   '@keyframes spin': {
//     from: { transform: 'rotate(0deg)' },
//     to: { transform: 'rotate(360deg)' },
//   }
// };

// function MyApp({ Component, pageProps }) {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 2000); // Adjust the delay as needed
//   }, []);

//   return (
//     <>
//       {loading ? <Loading /> : <Component {...pageProps} />}
//     </>
//   );
// }

// export default MyApp;

// export default function Loading() {
//   return (

//     <div class="fixed inset-0 bg-black bg-opacity-90 trasparent flex justify-center items-center z-50">
//       <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
//     </div>
//   )
// }
// Function to create the spinner with JavaScript
/* From Uiverse.io by carlosepcc */ 

// import React from 'react'

export default function loading() {
  return (
    <div class="overlay fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
  <div class="loader border-t-2 rounded-full border-yellow-900 bg-yellow-400 bg-opacity-90 animate-spin aspect-square w-16 h-15 flex justify-center items-center text-yellow-700 text-3x1">
    $
  </div>
</div>

  )
}




