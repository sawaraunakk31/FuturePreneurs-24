import Marquee from "react-fast-marquee";
import image1 from "../../assests/assests/wadhwani.png";
import image2 from "../../assests/assests/Diviniti.png";

const Marq = () => {
  return (
    <div>
      <Marquee speed={100} className="bg-white overflow-hidden">
        <div className="flex gap-10 h-16 bg-white text-black justify-around font-bold text-lg md:text-xl leading-normal select-none">
        <span className="flex items-center font-bold h-full text-3xl"><b>Our Sponsors</b></span>
          <img src={image1.src} alt="Wadhwani Logo" className="h-17 mx-7" />
          <span className="flex items-center font-bold h-full text-3xl"><b>Our Sponsors</b></span>
          <img src={image2.src} alt="Diviniti Logo" className="h-17 mx-7" />
          <span className="flex items-center font-bold h-full text-3xl"><b>Our Sponsors</b></span>
          <img src={image1.src} alt="Wadhwani Logo" className="h-17 mx-7" />
          <span className="flex items-center font-bold h-full text-3xl"><b>Our Sponsors</b></span>
          <img src={image2.src} alt="Diviniti Logo" className="h-17 mx-7" />
          <span className="flex items-center font-bold h-full text-3xl"><b>Our Sponsors</b></span>
          <img src={image1.src} alt="Wadhwani Logo" className="h-17 mx-7" />
          <span className="flex items-center font-bold h-full text-3xl"><b>Our Sponsors</b></span>
          <img src={image2.src} alt="Diviniti Logo" className="h-17 mx-7" />
          
         
         
        </div>
      </Marquee>
    </div>
  );
};

export default Marq;
