// import Dropdownlogo from "@/components/dropdownlogo";

// const FaqMainContent = () => {
//   const faqs = [
//     { id: 1, q: "Is it compulsory to participate in a team?", ans: `Yes, it is compulsory to participate as a team.` },
//     { id: 2, q: "What is the team size?", ans: `Team can consist of 3 to 4 members.` },
//     { id: 3, q: "I’m interested in participating but I’m unable to find a team. What should I do?", ans: `You can register without a team; we will provide a team for you.` },
//     { id: 4, q: "Will there be any registration fees?", ans: `No, the event is free of cost.` },
//     { id: 5, q: "Do I need to have a business idea ready?", ans: `No, we provide support for idea development throughout the event - just bring your enthusiasm!` },
//     { id: 6, q: "What is the duration of the event?", ans: `The event will be conducted from 10:00 AM to 5:00 PM.` },
//     { id: 7, q: "Will ODs be provided for the event?", ans: `Yes, ODs will be provided for the duration of the event.` },
//     { id: 8, q: "I still have some doubts regarding the event. How can I get them resolved?", ans: `Contact: Anuj Khokhar: +91 8827995405 \n Yashita Jindal: +91 7696780371` },
//   ];

//   const Dropdown = () => {
//     document.addEventListener("click", (e) => {
//       const dropdownLogo = e.target.closest("Dropdownlogo");
//       if (dropdownLogo) {
//         dropdownLogo.nextElementSibling.style.display = "block";
//       }
//     });
//   }

//   return (
//     <main className="m-12">
//         <div className="flex gap-20 justify-around">
//             <div className="flex flex-col gap-10">
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="1"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[0].q}</p>
//                         <p className="hidden" >{faqs[0].ans}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="2"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[1].q}</p>
//                         <p className="hidden">{faqs[1].ans}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="3"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[2].q}</p>
//                         <p className="hidden">{faqs[2].ans}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="4"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[3].q}</p>
//                         <p className="hidden">{faqs[3].ans}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="flex flex-col gap-10">
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="5"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[4].q}</p>
//                         <p className="hidden">{faqs[4].ans}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="6"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[5].q}</p>
//                         <p className="hidden">{faqs[5].ans}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="7"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[6].q}</p>
//                         <p className="hidden">{faqs[6].ans}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-5">
//                     <Dropdownlogo onClick={Dropdown} id="8"/>
//                     <div className="flex flex-col">
//                         <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faqs[7].q}</p>
//                         <p className="hidden">{faqs[7].ans}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </main>
//   );
// };

// export default FaqMainContent;

// "use client";

// import { useState } from "react";
// import Dropdownlogo from "../dropdownlogo";

// const FaqMainContent = () => {
//   const faqs = [
//     { id: 1, q: "Is it compulsory to participate in a team?", ans: `Yes, it is compulsory to participate as a team.` },
//     { id: 2, q: "What is the team size?", ans: `Team can consist of 3 to 4 members.` },
//     { id: 3, q: "I’m interested in participating but I’m unable to find a team. What should I do?", ans: `You can register without a team; we will provide a team for you.` },
//     { id: 4, q: "Will there be any registration fees?", ans: `No, the event is free of cost.` },
//     { id: 5, q: "Do I need to have a business idea ready?", ans: `No, we provide support for idea development throughout the event - just bring your enthusiasm!` },
//     { id: 6, q: "What is the duration of the event?", ans: `The event will be conducted from 10:00 AM to 5:00 PM.` },
//     { id: 7, q: "Will ODs be provided for the event?", ans: `Yes, ODs will be provided for the duration of the event.` },
//     { id: 8, q: "I still have some doubts regarding the event. How can I get them resolved?", ans: `Contact: Anuj Khokhar: +91 8827995405 \n Yashita Jindal: +91 7696780371` },
//   ];

//   const [visibleFaqs, setVisibleFaqs] = useState({});

//   const toggleDropdown = (id) => {
//     setVisibleFaqs((prevVisibleFaqs) => ({
//       ...prevVisibleFaqs,
//       [id]: !prevVisibleFaqs[id],
//     }));
//   };

//   return (
//     <main className="m-12">
//       <div className="flex flex-col gap-10 lg:flex-row lg:gap-20 justify-around">
//         <div className="flex flex-col gap-10">
//           {faqs.slice(0, 4).map((faq) => (
//             <div key={faq.id} className="flex items-center gap-5">
//               <Dropdownlogo onClick={() => toggleDropdown(faq.id)} />
//               <div className="flex flex-col">
//                 <p className="text-2xl w-[fit-content] after:hidden after:content-[''] after:w-full after:h-[2px] after:bg-[#000000]">{faq.q}</p>
//                 <p className={visibleFaqs[faq.id] ? 'block' : 'hidden'}>{faq.ans}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex flex-col gap-10">
//           {faqs.slice(4).map((faq) => (
//             <div key={faq.id} className="flex items-center gap-5">
//               <Dropdownlogo onClick={() => toggleDropdown(faq.id)} />
//               <div className="flex flex-col">
//                 <p className="text-2xl w-[fit-content]">{faq.q}</p>
//                 <p className={visibleFaqs[faq.id] ? 'block' : 'hidden'}>{faq.ans}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default FaqMainContent;  


"use client";

import { useState } from "react";
import Dropdownlogo from "../dropdownlogo";

const FaqMainContent = () => {
  const faqs = [
    { id: 1, q: "Who is eligible to participate in the competition?", ans: `Students of all years are eligible to participate in Futurepreneurs 10.0.` },
    { id: 2, q: "Is there any registration fee?", ans: `The event is absolutely free of cost.` },
    { id: 3, q: "What is the duration of the event?", ans: `The event will take place from 9:00 am to 7:00 pm.` },
    { id: 4, q: "Will ODs be provided for the event?", ans: `Yes, ODs will be provided for the duration of the event.` },
    { id: 5, q: "How many members can be in a team?", ans: `A team consists of 3-4 people.` },
    { id: 6, q: "Will there be any prize pool for the event?", ans: `Yes, an enticing prize pool awaits you. All the details will be shared on our social media platforms.` },
    { id: 7, q: "Can I participate individually?", ans: `Registrations can be made individually, but participants are required to join a team to be a part of the event.` },
    { id: 8, q: "I still have some doubts regarding the event. How can I get them resolved?", ans:( <>
      For any further queries, you can contact the following POCs:
      <br />
      <strong>1. Shantanu Bhagwat:</strong> +91 9167117310
      <br />
      <strong>2. Siddhi J Salunkhe:</strong> +91 8484996634
    </>
  ) },
  ];

  const [visibleFaqs, setVisibleFaqs] = useState({});

  const toggleDropdown = (id) => {
    setVisibleFaqs((prevVisibleFaqs) => ({
      ...prevVisibleFaqs,
      [id]: !prevVisibleFaqs[id],
    }));
  };

  return (
    <main className=" mt-0 md:pl-20 md:pr-20 p-10 pt-0 lg:max-h-[55vh]">
      <div className="flex flex-col gap-5  lg:flex-row lg:gap-20 justify-around text-wrap">
        <div className="flex flex-col gap-2 md:gap-5  lg:w-[45vw]">
          {faqs.slice(0, 4).map((faq) => (
            <div key={faq.id} className="flex items-center gap-5">
              <Dropdownlogo onClick={() => toggleDropdown(faq.id)} />
              <div className="flex flex-col gap-5">
                <p
                  className={`text-xl md:text-2xl w-[fit-content] relative after:transition-all after:duration-300 after:ease-in-out after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-[#000000] ${
                    visibleFaqs[faq.id] ? 'after:w-full' : 'after:w-0'
                  }`} style={{
                    fontFamily: "'Almarai', sans-serif"
                  }} 
                >
                  {faq.q}
                </p>
                <p
                  className={`transition-transform duration-300 ease-in-out transform text-l md:text-xl ${
                    visibleFaqs[faq.id] ? 'translate-y-0 opacity-100 max-h-full' : 'translate-y-[-20px] opacity-0 max-h-0'
                  } overflow-hidden`} style={{
                    fontFamily: "'Almarai', sans-serif"
                  }}
                >
                  {faq.ans}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 md:gap-5 lg:w-[45vw]">
          {faqs.slice(4).map((faq) => (
            <div key={faq.id} className="flex items-center gap-5">
              <Dropdownlogo onClick={() => toggleDropdown(faq.id)} />
              <div className="flex flex-col gap-5">
                <p
                  className={`text-xl md:text-2xl w-[fit-content] relative after:transition-all after:duration-300 after:ease-in-out after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-[#000000] ${
                    visibleFaqs[faq.id] ? 'after:w-full' : 'after:w-0'
                  }`}
                >
                  {faq.q}
                </p>
                <p
                  className={`transition-transform duration-300 ease-in-out transform text-l md:text-xl ${
                    visibleFaqs[faq.id] ? 'translate-y-0 opacity-100 max-h-full' : 'translate-y-[-20px] opacity-0 max-h-0'
                  }`}
                >
                  {faq.ans}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FaqMainContent;
