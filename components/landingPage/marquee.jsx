import Marquee from "react-fast-marquee";
const Marq = () => {
  return (
    <div className="">
      <Marquee speed={100} className="bg-white overflow-hidden">
        <div className="flex gap-10 bg-white text-black justify-around font-bold text-lg md:text-3xl leading-normal select-none">
          &nbsp;
          •
          &nbsp;FUTUREPRENEURS 10.0&nbsp;
          •
          &nbsp;FUTUREPRENEURS 10.0&nbsp;
          •
          &nbsp;FUTUREPRENEURS 10.0&nbsp;
          •
          &nbsp;FUTUREPRENEURS 10.0&nbsp;
          •
          &nbsp;FUTUREPRENEURS 10.0&nbsp;
        </div>
      </Marquee>
    </div>
  );
};

export default Marq;