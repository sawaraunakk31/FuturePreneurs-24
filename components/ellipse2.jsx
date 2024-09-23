import React from "react";

const MyComponent4 = ({Button}) => (
  <div className="relative">
    <div
      className="h-96 m-0"
      style={{
        border: "2px solid gray",
        borderRadius: "0 100% 0 0",
        width: "50rem",
        height: "40rem",
        overflow: "hidden",
      }
         // Clip anything that goes outside the arc
      }
    >
      <Button></Button>
      <div className="flex" style={{ marginLeft: "5vw" }}>
    <div className="h-96 w-6 border-l-4 border-black" style={{borderImageSource:
          "linear-gradient(252.97deg, #FEFEFE -0.39%, #ECEAEA 31.09%, #D1CECE 97.59%)", // Apply gradient to the border
        borderImageSlice: 1}}></div>
    <div className="h-96 w-6 border-l-4  border-black" style={{borderImageSource:
          "linear-gradient(252.97deg, #FEFEFE -0.39%, #ECEAEA 31.09%, #D1CECE 97.59%)", // Apply gradient to the border
        borderImageSlice: 1}}></div>
    <div className="h-96 w-6 border-l-4 border-r-4  border-black" style={{borderImageSource:
          "linear-gradient(252.97deg, #FEFEFE -0.39%, #ECEAEA 31.09%, #D1CECE 97.59%)", // Apply gradient to the border
        borderImageSlice: 1,}}></div>
      </div>
    </div>
  </div>
);

export default MyComponent4;
