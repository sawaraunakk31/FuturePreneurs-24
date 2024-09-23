
import FaqHeader from "./FaqHeader";
import Footer from "@/components/footer";
import FaqMainContent from "@/components/FAQcomp/FaqMainContent";
import Footersm from "../footersm";

export default function Faqpage(){
    return(
        <>
        <main className="overflow-auto ">
        <FaqHeader/>
        <FaqMainContent/>  
        <div className="hidden md:block"><Footer/></div>
        <div className="block md:hidden"><Footersm/></div>
        </main>
        </>
    )
}