
import FaqHeader from "./FaqHeader";
import Footer from "@/components/footer";
import FaqMainContent from "@/components/FAQcomp/FaqMainContent";
import Footersm from "../footersm";

export default function Faqpage(){
    return(
        <>
        <main className="overflow-auto z-50">
                <FaqHeader/>
                <div className="custom-faq-bg md:h-[80vh] lg:h-[55vh]">
                <div  className="z-50">
                </div><FaqMainContent/>  
            </div>
        <div className="hidden md:block"><Footer/></div>
        <div className="block md:hidden"><Footersm/></div>
        </main>
        </>
    )
}