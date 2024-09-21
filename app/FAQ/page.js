import "../globals.css";
import FaqHeader from "../../components/FAQcomp/FaqHeader";
import Footer from "@/components/footer";
import FaqMainContent from "@/components/FAQcomp/FaqMainContent";

export default function Page(){
    return(
        <>
        <main className="overflow-auto">

        <FaqHeader/>
        <Footer/>
        </main>
        </>
    )
}