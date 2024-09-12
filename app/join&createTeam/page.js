export default function page() {
  return (
    <main className="h-[100vh] w-[100vw] flex items-center justify-center bg-[url('../assests/assests/background_image.jpg')]">
      <div className="bg-[#141B2B] h-[80vh] w-[90vw] lg:h-[50vh] lg:w-[50vw] rounded-md flex justify-around  content-around flex-col">
        <div className=" hidden lg:block text-center font-bold  text-[4vh] lg:text-[5vh]">Join a Team or Create a Team</div>
        <div className=" lg:hidden md:hidden text-center font-bold  text-[4vh] lg:text-[4vh]">Join a Team </div>
        <div className=" lg:hidden md:hidden text-center font-bold  text-[4vh] lg:text-[4vh]">or</div>
        <div className=" lg:hidden md:hidden text-center font-bold  text-[4vh] lg:text-[4vh] pb-5">Create a Team</div>
        <div className="flex flex-col lg:flex lg:flex-row lg:gap-4 lg:content-around items-center justify-around ">
          <div className="lg:h-[30vh] flex-col justify-evenly  content-center lg:w-[25vw]">
            <h1 className="text-center text-[4vh] py-5">Join your team</h1>
            <div className="flex flex-col  items-center gap-5">
              <input type="text" placeholder="Enter team name" className="lg:w-[15vw] w-[55vw] h-[5vh] rounded-md text-xl text-slate-900  focus:outline-none focus:placeholder-transparent active:scale-95 transition-all duration-300"/>
              <button type="submit" className=" mb-7 rounded-3xl bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] text-center lg:w-[13vw] w-[50vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300 ">Find team to join</button>
            </div>
          </div>
          <div className="lg:h-[30vh] lg:w-[0vw] w-[70vw] border-2 border-[#D9D9D9] rounded-lg "></div>
          <div className="lg:h-[30vh] flex-col justify-center  content-center lg:w-[25vw]">
            <h1 className="text-center text-[4vh] py-5">Create your team</h1>
            <div className="flex flex-col justify-evenly items-center gap-5">
              <input type="text" placeholder="Enter team name" className="lg:w-[15vw] w-[55vw] h-[5vh] rounded-md text-xl text-slate-900  focus:outline-none focus:placeholder-transparent active:scale-95 transition-all duration-300"/>
              <button type="submit" className="mb-7 rounded-3xl bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] text-center lg:w-[13vw] w-[50vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300">Create your own team</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
