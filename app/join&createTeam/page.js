export default function page() {
  return (
    <main className="bg-white h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="bg-[#141B2B] h-[50vh] w-[50vw] rounded-md flex justify-around  content-around flex-col">
        <div className="text-xl text-center font-bold gap-4 text-4xl">Join a Team or Create a Team</div>
        <div className="flex gap-4 content-around justify-around border">
          <div className="h-[30vh] flex-col justify-evenly border">
            <h1 className="text-center text-2xl">Join your team</h1>
            <form action="" method="post">
              <div className="rounder-md ">
              <input type="text" placeholder="Enter team name" className="w-[15vw] h-[5vh] rounded-md"/>
            </div>
              <button type="submit" className="rounded-lg bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] text-center w-[10vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300">Find team to join</button>
            </form>
          </div>
          <div className="h-[30vh] border-2 border-[#D9D9D9] rounded-lg"></div>
          <div className="flex-col">
            <h1 className="text-center text-2xl">Create your team</h1>
            <form action="" method="post">
              <div className="rounder-md">
              <input type="text" placeholder="Enter team name" className="w-[15vw] h-[5vh] rounded-md text-xl"/>
            </div>
              <button type="submit" className="rounded-lg bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] text-center w-[10vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300">Create your own team</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
