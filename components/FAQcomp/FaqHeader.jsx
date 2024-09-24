import "../../app/globals.css";
export default function FaqHeader(){
 return (
        <>
        <div className=" h-[fit-content] ml-10 mr-10"
        style={{
            fontFamily: "'TrapBold', sans-serif",
            background: "black",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent", 
          }}>
            <h1 className="text-left text-[10vh] sm:text-[15vw] leading-[30vh] ">FAQs</h1>
        </div>
        </>
    )
}


