import React from 'react'
import teammember from '@/assests/assests/teammember.jpg'
// import Image from 'next/image';
import skilltest from '@/assests/assests/skilltest.png'
import problemsolving from '@/assests/assests/problemsolving.png'
import selfanalysis from '@/assests/assests/selfanalysis.png'

export default function Home() {
  return (
    <>
    <div className=" hidden md:block bg-white py-12 px-4">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex w-[24.2rem] bg-white border-b-2 border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem]">
            <div className="flex items-center w-[23rem] bg-white px-6 py-2 rounded-t-lg rounded-b-lg mb-[-0.5rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-3.2rem]">
              <h1 className="text-2xl font-extrabold font-outfit">STORY BEHIND...</h1>
              <button className="ml-[4.5rem] bg-black text-white p-2 rounded-full flex items-center justify-center w-10 h-10">
              ➔
</button>

            </div>
          </div>
        </div>
        <p className="text-black font-almarai mt-10 text-justify">
          Born from E-Cell’s fiery spirit, we are ready to bring Futurepreneurs 10.0, to converse unique ideas. This event was meticulously crafted with the prime objective of delivering first-hand experiences of a business simulation event right to the participants' desks. Students from diverse backgrounds have established names for themselves by solving real-life problems with dedication, commitment, and analytical skills amongst their peers. These challenges have helped them to move forward with success, showing them the importance of initiation and working together.
        </p>
      </div>

      {/* Cards Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[90%] mx-auto">
        {/* Problem Solving Card */}
        <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-6 rounded-xl max-h-fit max-w-fit border-2 border-purple-400 hidden md:block"> {/* Visible only on medium and large devices */}
          <div className="absolute -top-8 -left-[0.1rem] transform">
            <div className="bg-white mt-[1.9rem] border-r-2 border-r-purple-400 border-b-2 border-b-purple-400 pr-2 pt-4 pb-2 rounded-br-lg">
              <div className="bg-white mt-[-2.6rem] px-4 py-2 border-2 border-black rounded-t-lg rounded-b-lg">
                <h2 className="text-lg font-outfit font-bold">Problem Solving</h2>
              </div>
            </div>
          </div>

  <img src={problemsolving.src} alt="Problem Solving" className="float-right  h-32 w-32 m-2" />
  <p className="text-black font-almarai mt-12  overflow-wrap break-words max-w-full">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue massa justo, ut cursus leo fringilla tempus. Sed tempus bibendum..
  </p>

        </div>

        {/* Skill Testing Card */}
        <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-6 rounded-xl max-h-fit border-2 border-purple-400 hidden md:block"> {/* Visible only on medium and large devices */}
          <div className="absolute -top-8 -left-[0.1rem] transform">
            <div className="bg-white mt-[1.9rem] border-r-2 border-r-purple-400 border-b-2 border-b-purple-400 pr-2 pt-4 pb-2 rounded-br-lg">
              <div className="bg-white mt-[-2.6rem] px-4 py-2 border-2 border-black rounded-t-lg rounded-b-lg">
                <h2 className="text-lg font-outfit font-bold">Skill Testing</h2>
              </div>
            </div>
          </div>

         
  <img src={skilltest.src} alt="Problem Solving" className="float-right  h-32 w-32 m-2" />
  <p className="text-black font-almarai mt-12  overflow-wrap break-words max-w-full">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue massa justo, ut cursus leo fringilla tempus. Sed tempus bibendum...
  </p>
        </div>

        {/* Self Analysis Card */}
        <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-6 rounded-xl max-h-fit border-2 border-purple-400 hidden md:block"> {/* Visible only on medium and large devices */}
          <div className="absolute -top-8 -left-[0.1rem] transform">
            <div className="bg-white mt-[1.9rem] border-r-2 border-r-purple-400 border-b-2 border-b-purple-400 pr-2 pt-4 pb-2 rounded-br-lg">
              <div className="bg-white mt-[-2.6rem] px-4 py-2 border-2 border-black rounded-t-lg rounded-b-lg">
                <h2 className="text-lg font-outfit font-bold">Self Analysis</h2>
              </div>
            </div>
          </div>

         
  <img src={selfanalysis.src} alt="Problem Solving" className="float-right  h-32 w-32 m-2" />
  <p className="text-black font-almarai mt-12  overflow-wrap break-words max-w-full">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue massa justo, ut cursus leo fringilla tempus. Sed tempus bibendum...
  </p>
        </div>
      </div>
    </div>



    <div className="  md:hidden bg-white py-12 px-4">
    <div className="relative bg-gradient-to-r bg-gradient from-[#540FFE29] via-[#D7C6FF29] to-[#A96CFF29] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-[4rem] border-2 border-gray-400">
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          
            <div className="flex items-center w-[17rem] bg-gradient-to-r bg-gradient from-[#D7C6FF29] to-[#A96CFF29] px-6 py-2 rounded-t-lg rounded-b-lg border-2 border-gray-400 mt-[-3.2rem]">
              <h1 className="text-xl font-extrabold font-outfit">STORY BEHIND...</h1>
              <button className="ml-[1rem] bg-black text-white p-2 rounded-full flex items-center justify-center w-8 h-8">
              ➔
</button>
            
          </div>
        </div>
        <p className="text-black font-almarai mt-16 text-justify">
          Born from E-Cell’s fiery spirit, we are ready to bring Futurepreneurs 10.0, to converse unique ideas. This event was meticulously crafted with the prime objective of delivering first-hand experiences of a business simulation event right to the participants' desks. Students from diverse backgrounds have established names for themselves by solving real-life problems with dedication, commitment, and analytical skills amongst their peers. These challenges have helped them to move forward with success, showing them the importance of initiation and working together.
        </p>
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-[4rem] border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex w-[15rem] bg-white border-b-2 border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem]">
            <div className="flex items-center justify-center w-[14rem] bg-white px-4 py-2 rounded-t-lg rounded-b-lg mb-[-0.6rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-2.9rem]">
              <h1 className="text-xl font-extrabold font-outfit ">EXPLORE</h1>
             
            </div>
          </div>
        </div>
        <img src={selfanalysis.src} alt="" className=" h-32 w-AUTO mx-auto mt-2" />
            <p className="text-black font-almarai mt-3 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue massa justo, ut cursus leo fringilla tempus. Sed tempus bibendum...
            </p>
      </div>
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-[4rem] border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex w-[15rem] bg-white border-b-2 border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem]">
        <div className="flex items-center justify-center w-[14rem] bg-white px-4 py-2 rounded-t-lg rounded-b-lg mb-[-0.6rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-2.9rem]">
              <h1 className="text-xl font-extrabold font-outfit ">CREATE</h1>
             
            </div>
          </div>
        </div>
        <img src={skilltest.src} alt="" className=" h-32 w-AUTO mx-auto mt-2" />
            <p className="text-black font-almarai mt-3 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue massa justo, ut cursus leo fringilla tempus. Sed tempus bibendum...
            </p>
      </div>
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg  max-w-3xl mx-auto mt-[4rem] border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex w-[15rem] bg-white border-b-2 border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem]">
        <div className="flex items-center justify-center w-[14rem] bg-white px-4 py-2 rounded-t-lg rounded-b-lg mb-[-0.6rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-2.9rem]">
              <h1 className="text-xl font-extrabold font-outfit ">TRIUMPH</h1>
             
            </div>
          </div>
        </div>
        <img src={problemsolving.src} alt="" className=" h-32 w-AUTO mx-auto mt-2" />
            <p className="text-black font-almarai mt-3 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue massa justo, ut cursus leo fringilla tempus. Sed tempus bibendum...
            </p>
      </div>
      </div>






    </>
  );
}
