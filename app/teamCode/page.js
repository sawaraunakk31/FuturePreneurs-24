export default function Page() {
  return (
    <div className="bg-[url('../assests/assests/background_image.jpg')] h-[100vh] w-[100vw] flex flex-col items-center justify-around">
      <div className="bg-[#141B2B] h-[45vh] w-[70vw] md:h-[57vh] md:w-[45vw] rounded-md flex flex-col justify-center">
        <div className="text-2xl lg:text-4xl font-bold text-center py-8 text-white">
          Enter Team Code
        </div>
        <div className="flex flex-col gap-4 w-[inherit] justify-around content-center">
          <div className="flex flex-col justify-center items-center gap-8">
            <input 
              type="text" 
              placeholder="Enter Team Code" 
              className="w-[53vw] md:w-[30vw] lg:w-[15vw] focus:font-bold active:scale-95 transition-all duration-300 rounded-md p-2 text-black"/>
            <button type="Submit" className=" items-center md-7 rounded-3xl w-[30vw] md:w-[20vw] lg:w-[11vw] bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] transition-transform ease-in-out duration-300 hover:scale-110 active:scale-95 bg-blue-500 text-white p-2 border">
              Join Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
