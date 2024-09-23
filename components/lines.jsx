import React from "react";
const MyComponent = () => (
  <div className="flex justify-between">
    <div className="flex " style={{marginLeft:"5vw"}}>
    <div className="h-52 w-6 border-l-4 border-black" style={{borderImageSource:
          "linear-gradient(252.97deg, #FEFEFE -0.39%, #ECEAEA 31.09%, #D1CECE 97.59%)", // Apply gradient to the border
        borderImageSlice: 1,borderRadius:"0 0 0 100%"}}></div>
    <div className="h-52 w-6 border-l-4  border-black" style={{borderImageSource:
          "linear-gradient(252.97deg, #FEFEFE -0.39%, #ECEAEA 31.09%, #D1CECE 97.59%)", // Apply gradient to the border
        borderImageSlice: 1,borderRadius:"0 0 0 100%"}}></div>
    <div className="h-52 w-6 border-l-4 border-r-4  border-black" style={{borderImageSource:
          "linear-gradient(252.97deg, #FEFEFE -0.39%, #ECEAEA 31.09%, #D1CECE 97.59%)", // Apply gradient to the border
        borderImageSlice: 1,borderRadius:"0 0 0 100%"}}></div>
  </div>

<div className="h-52 w-96" style={{border:"2px solid grey ",
         borderRadius:"0 0 0 100%"}}>

  </div>
  </div>
);
export default MyComponent;
