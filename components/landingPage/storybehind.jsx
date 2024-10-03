import React from 'react'
import teammember from '@/assests/assests/teammember.jpg'
// import Image from 'next/image';
import skilltest from '@/assests/assests/skilltest.png'
import problemsolving from '@/assests/assests/problemsolving.png'
import selfanalysis from '@/assests/assests/selfanalysis.png'

export default function Home() {
  return (
    <div  id="storyBehind" className='min-h-screen flex place-items-center'>
    <div className=" hidden md:block bg-white pb-12 px-2">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex w-[24.2rem] bg-white border-b-2 border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem]">
            <div className="flex items-center justify-center w-[23rem] bg-white px-6 py-2 rounded-t-lg rounded-b-lg mb-[-0.5rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-3.2rem]">
              <h1 className="text-2xl font-extrabold font-outfit">STORY BEHIND</h1>
    

            </div>
          </div>
        </div>
        <p className="text-black font-almarai mt-10 text-justify">
        Futurepreneurs was built from the ground up by E-Cell, VIT, with the aim of delivering real-world experiences directly to the participants’ desks. This event offers a glimpse into the challenges of the professional world, providing participants with the chance to test and refine their analytical and problem-solving skills alongside their peers. Over the years, innumerable participants from various fields have contributed to the success and lasting impact of the event.
        </p>
      </div>

      {/* Cards Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[90%] mx-auto">
        {/* Problem Solving Card */}
        <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-6 rounded-xl h-[15.2rem] max-w-fit border-2 border-purple-400 hidden md:block"> {/* Visible only on medium and large devices */}
          <div className="absolute -top-8 -left-[0.1rem] transform">
            <div className="bg-white mt-[1.9rem] border-r-2 border-r-purple-400 border-b-2 border-b-purple-400 pr-2 pt-4 pb-2 rounded-br-lg">
              <div className="bg-white mt-[-2.6rem] px-4 py-2 border-2 border-black rounded-t-lg rounded-b-lg">
                <h2 className="text-lg font-outfit font-bold">Problem Solving</h2>
              </div>
            </div>
          </div>

  <img src={problemsolving.src} alt="Problem Solving" className="float-right  h-32 w-32 m-2" />
  <p className="text-black font-almarai mt-12  overflow-wrap break-words max-w-full">
  The goal is visible, but are you willing to tread the waters? Let your knowledge, wit and will steer you forward towards your goals and destination. 
  </p>

        </div>

        {/* Skill Testing Card */}
        <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-6 rounded-xl h-[15.2rem] border-2 border-purple-400 hidden md:block"> {/* Visible only on medium and large devices */}
          <div className="absolute -top-8 -left-[0.1rem] transform">
            <div className="bg-white mt-[1.9rem] border-r-2 border-r-purple-400 border-b-2 border-b-purple-400 pr-2 pt-4 pb-2 rounded-br-lg">
              <div className="bg-white mt-[-2.6rem] px-4 py-2 border-2 border-black rounded-t-lg rounded-b-lg">
                <h2 className="text-lg font-outfit font-bold">Skill Testing</h2>
              </div>
            </div>
          </div>

         
  <img src={skilltest.src} alt="Problem Solving" className="float-right  h-32 w-32 m-2" />
  <p className="text-black font-almarai mt-12  overflow-wrap break-words max-w-full">
  Prepare yourself to test your mettle as you navigate various entrepreneurial challenges, find innovative solutions, and bring ideas to life.

  </p>
        </div>

        {/* Self Analysis Card */}
        <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-6 rounded-xl h-[15.2rem] border-2 border-purple-400 hidden md:block"> {/* Visible only on medium and large devices */}
          <div className="absolute -top-8 -left-[0.1rem] transform">
            <div className="bg-white mt-[1.9rem] border-r-2 border-r-purple-400 border-b-2 border-b-purple-400 pr-2 pt-4 pb-2 rounded-br-lg">
              <div className="bg-white mt-[-2.6rem] px-4 py-2 border-2 border-black rounded-t-lg rounded-b-lg">
                <h2 className="text-lg font-outfit font-bold">Challenge Yourself</h2>
              </div>
            </div>
          </div>

         
  <img src={selfanalysis.src} alt="Problem Solving" className="float-right  h-32 w-32 m-2" />
  <p className="text-black font-almarai mt-12  overflow-wrap break-words max-w-full">
  Test if your ship can blaze through the storm without sinking. Unlock your true capabilities, outwit your opponents, and discover your team's potential to emerge victorious in the event's toughest trials.

  </p>
        </div>
      </div>
    </div>



    <div className="  md:hidden bg-white py-12 px-4">
    <div className="relative bg-gradient-to-r bg-gradient from-[#540FFE29] via-[#D7C6FF29] to-[#A96CFF29] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-[4rem] border-2 border-gray-400">
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          
            <div className="flex items-center justify-center w-[17rem] bg-gradient-to-r bg-gradient from-[#D7C6FF29] to-[#A96CFF29] px-6 py-2 rounded-t-lg rounded-b-lg border-2 border-gray-400 mt-[-3.2rem]">
              <h1 className="text-xl font-extrabold font-outfit">STORY BEHIND</h1>
             
            
          </div>
        </div>
        <p className="text-black font-almarai mt-16 text-justify">
        Futurepreneurs was built from the ground up by E-Cell, VIT, with the aim of delivering real-world experiences directly to the participants’ desks. This event offers a glimpse into the challenges of the professional world, providing participants with the chance to test and refine their analytical and problem-solving skills alongside their peers. Over the years, innumerable participants from various fields have contributed to the success and lasting impact of the event.

        </p>
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-[4rem] border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex w-[15rem] bg-white border-t-2 border-t-transparent border-b-2 border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem] ">
            <div className="flex items-center justify-center w-[14rem] bg-white px-4 py-2 rounded-t-lg rounded-b-lg mb-[-0.6rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-2.9rem]">
              <h1 className="text-lg font-extrabold font-outfit ">Problem Solving </h1>
             
            </div>
          </div>
        </div>
        <img src={problemsolving.src} alt="" className=" h-32 w-AUTO mx-auto mt-2" />
            <p className="text-black font-almarai mt-3 text-justify ">
            The goal is visible, but are you willing to tread the waters? Let your knowledge, wit and will steer you forward towards your goals and destination. 

            </p>
      </div>
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-[4rem] border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex w-[15rem] bg-white border-b-2 border-t-2 border-t-transparent border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem]">
        <div className="flex items-center justify-center w-[14rem] bg-white px-4 py-2 rounded-t-lg rounded-b-lg mb-[-0.6rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-2.9rem]">
              <h1 className="text-lg font-extrabold font-outfit ">Skill Testing </h1>
             
            </div>
          </div>
        </div>
        <img src={skilltest.src} alt="" className=" h-32 w-AUTO mx-auto mt-2" />
            <p className="text-black font-almarai mt-3 text-justify">
            Prepare yourself to test your mettle as you navigate entrepreneurial challenges, find innovative solutions, and bring ideas to life.

            </p>
      </div>
      <div className="relative bg-gradient-to-r bg-gradient from-[#BFB4FF69] via-[#E6FCFF5A] to-[#A1EEFF69] p-8 rounded-xl shadow-lg  max-w-3xl mx-auto mt-[4rem] border-2 border-purple-400">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="flex w-[15rem] bg-white border-b-2 border-t-2 border-t-transparent border-b-purple-400 border-r-2 border-r-purple-400 border-l-2 border-l-purple-400 px-4 py-4 rounded-b-lg mt-[1.9rem]">
        <div className="flex items-center justify-center w-[14rem] bg-white px-4 py-2 rounded-t-lg rounded-b-lg mb-[-0.6rem] mr-[-0.5rem] ml-[-0.5rem] border-2 border-black mt-[-2.9rem]">
              <h1 className="text-md font-extrabold font-outfit ">Challenge Yourself</h1>
             
            </div>
          </div>
        </div>
        <img src={selfanalysis.src} alt="" className=" h-32 w-AUTO mx-auto mt-2" />
            <p className="text-black font-almarai mt-3 text-justify">
            Test if your ship can blaze through the storm without sinking. Unlock your true capabilities, outwit your opponents, and discover your team's potential to emerge victorious in the event's toughest trials.
            </p>
      </div>
      </div>






    </div>
  );
}
