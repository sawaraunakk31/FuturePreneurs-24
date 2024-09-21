import "../../app/globals.css";
import FaqHeader from "./FaqHeader";
import Footer from "@/components/footer";
import FaqMainContent from "@/components/FAQcomp/FaqMainContent";
import BgImage from  "@/assests/assests/FAQs.png";


export default function Faqpage(){
    return(
        <>
        <main className="overflow-auto" >

        <FaqHeader/>
        <FaqMainContent/>
        <Footer/>
        </main>
        </>
    )
}