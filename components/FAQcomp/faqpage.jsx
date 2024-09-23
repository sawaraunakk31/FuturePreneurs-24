
import FaqHeader from "./FaqHeader";
import Footer from "@/components/footer";
import faq from '@/public/assests/assests/FAQs_background.png'
import FaqMainContent from "@/components/FAQcomp/FaqMainContent";
import Footersm from "../footersm";

export default function Faqpage(){
    return(
        <>
        <main className="overflow-auto ">
            
        <FaqHeader/>
         <div className="bg-[url('../../public/assests/assests/FAQs_background.png')">
            {/* <img src={faq} className="-z-10" /> */}
        <FaqMainContent/>
         </div>   
        <Footer className="hidden md:flex"/>
        <Footersm className="flex"/>
        </main>
        </>
    )
}