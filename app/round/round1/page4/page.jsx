"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { socket } from "@/app/socket.js";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import back from '../back2.svg';

export default function Bidder() {
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const [allocatedItems, setAllocatedItems] = useState([]);
    const [price, setPrice] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isFirstHalf, setIsFirstHalf] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [team, setTeam] = useState("");
    const [hold,setHold]=useState(0);
    const [bondsBidFor, setBondsBidFor] = useState([]);

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value);
        }
    };

    const router = useRouter();
    const handleContinue = () => {
        setIsOverlayOpen(true);
    };
    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

    useEffect(() => {
        if (status == "unauthenticated") {
            setLoading(false);
            toast.error("Please Log in or Sign up");
            router.push("/");
            return;
        }

        if (status == "authenticated") {
            setLoading(false);
            const token = session.accessTokenBackend;
            console.log(token);

            if (socket.connected) {
                console.log("Socket already connected");
                onConnect();
            } else {
                socket.connect();
                socket.on("connect", () => {
                    console.log("Connected to socket");
                    socket.emit("authenticate", { token });
                });

                socket.on("authenticated", () => {
                    console.log("Authentication successful");
                });

                socket.on("userDetails", ({team}) => {
                    setWalletBalance(team.wallet)
                    setTeam(team.teamName);
                });

                socket.on("highestBids", setHighestBids);
                socket.on("highestBid", handleNewHighestBid);

                socket.on("auth_error", (err) => {
                    console.error("Authentication error:", err);
                    toast.error("Authentication failed, please log in again.");
                    router.push("/");
                });

                socket.on("connect_error", (err) => {
                    console.error("Socket connection error:", err);
                    toast.error("Socket connection error, please try again later.");
                });
            }
        }
        
        function onConnect() {
            socket.io.engine.on("upgrade", () => {
                console.log("upgrade to websocket");
            });
        }
        
        function onDisconnect() {
            console.log("user disconnected");
        }

        // const timer = setInterval(() => {
        //     setTimeLeft((prevTime) => {
        //         if (prevTime > 0) return prevTime - 1;
        //         setIsTimerOver(true);
        //         clearInterval(timer);
        //         return 0;
        //     });
        // }, 1000);
        // return () => clearInterval(timer);

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        socket.on("highestBids", setHighestBids);
        socket.on("highestBid", handleNewHighestBid);

        socket.on("syncTimer",({timeLeft:serverTimeLeft})=>{
            setTimeLeft(serverTimeLeft);
            if (serverTimeLeft == 60) {
                alert("Bidding is over.");
            }
        })

        return () => {
            socket.off("connect", onConnect);
            socket.off("authenticated");
            socket.off("auth_error");
            socket.off("disconnect", onDisconnect);
            socket.off("highestBids", setHighestBids);
            socket.off("highestBid", handleNewHighestBid);
            socket.off("syncTimer");
            socket.disconnect();
        };
    }, [status]);

    const setHighestBids = ({ highestBids, allocatedBids }) => {
        setItems(highestBids);
        setAllocatedItems(allocatedBids);
        setBondsBidFor(bondsBidFor);
    }

    const handleNewHighestBid = ({highestBid, index}) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = highestBid;
            return newItems;
        });
    }

    const handleNewBid = (ID, currentBid) => {
        const index = ID-1;
        const newBidValue = parseInt(price);
        if (isNaN(newBidValue) || newBidValue <= 0) {
            alert("Please enter a valid bid amount.");
            return;
        } else if (currentBid<newBidValue) {
            socket.emit("newBid", {newBid: newBidValue, index});
            
            setItems(prevItems => {
                const newItems = [...prevItems];
                newItems[index] = newBidValue;
                return newItems;
            });

            setBondsBidFor(prev => [
                ...prev,
                index
            ])

            if (selectedItem && selectedItem.id === index + 1) {
                setSelectedItem({
                    ...selectedItem,
                    highestBid: newBidValue
                });
            }
            setPrice("");
          } else {
            alert("Your bid is lower than the current highest bid.");
            setPrice("");
          }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster />
            {loading && <LoadingScreen />}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={back}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="Background"
                />
            </div>
            <div className="flex flex-col w-[90%] lg:w-[80%] border-black border shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center bg-[#6865C9] text-white py-4 px-6 text-center h-[10vh] border-white border-4 shadow-xl scale-105 rounded-xl">
                    <h1 className="text-2xl font-semibold">{team}</h1>
                    <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
                    <div className="text-lg font-semibold">Wallet : ₹{(walletBalance / 10000000).toFixed(2)} Cr</div>
                    <button
                        className="px-4 py-1.5 bg-[#FFE55B] text-[#573712] rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C]"
                        onClick={handleContinue}
                    >
                        Apply Loan
                    </button>
                </div>

                {/* Main content */}
                <style jsx>{`
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;  /* Safari and Chrome */
                    }
                `}</style>
                <div
                    className="flex bg-[#F3F4F6] text-black leading-relaxed w-full h-[72vh] overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, #FFF 0%, #DAD0FF 47%, #FFF 100%)',
                    }}>
                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 p-8 w-3/4 overflow-y-auto hide-scrollbar">
                        {items.map((item, index) => (
                            <div
                                key={index+1}
                                className={`p-4 justify-center rounded-2xl shadow-lg transform transition-transform duration-300 ease-in-out text-center cursor-pointer border-white border-4 ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'bg-[#8481FA] scale-110 transition-transform'
                                    : 'bg-[linear-gradient(114deg,rgba(232,232,232,0.10)_15.11%,rgba(0,56,255,0.10)_81.96%)] hover:scale-105'
                                }`} 
                                disabled={allocatedItems[index] || hold || bondsBidFor.includes(index)}
                                onClick={() => {
                                    if (!allocatedItems[index] && !hold && !bondsBidFor.includes(index)) {
                                        setPrice('');
                                        setSelectedItem(selectedItem && selectedItem.id === item.id ? null : {id: index+1, name: `Item ${index + 1}`, highestBid: item })
                                    } else if ( allocatedItems[index] ) {
                                        toast.error("This item is already allocated to someone.");
                                    } else if ( bondsBidFor.includes(index) ) {
                                        toast.error("You have already bid on this item");
                                    } else {
                                        toast.error("You are currently holding or bidding on an item");
                                    }
                                }}
                            >
                                <h2 className={`text-xl font-bold ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-[#8481FA]'
                                }`}>{`Item ${index + 1}`}</h2>
                                <p className={`text-sm pt-2 pb-1 ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-black'
                                }`}>Highest</p>
                                <p className={`font-semibold pb-1 px-2 rounded-md w-[100%] ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-black bg-white'
                                    : 'text-white bg-[#8481FA]'
                                }`}>₹{(item/1000).toFixed(2)}k/-</p>
                            </div>
                        ))}
                    </div>

                    {/* Item Details */}
                    <div className="w-1/4 p-6 pl-0">
                        <div className="py-4 h-full flex flex-col justify-between bg-[linear-gradient(114deg,rgba(232,232,232,0.10)_15.11%,rgba(0,56,255,0.10)_81.96%)] border-white border-4 shadow-xl rounded-2xl">
                            {selectedItem ? (
                                <>
                                    <div className="text-center">
                                        <h1 className="text-2xl font-bold text-black">{selectedItem.name}</h1>
                                    </div>
                                    <hr className="border-white border-2 w-full my-1"/>
                                    <div className="m-2">
                                        <ul className="list-inside text-black">
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Current Bid</span>
                                                <span className="ml-24 bg-white w-52 px-2 text-right">{items[selectedItem.id-1]/1000}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Revenue</span>
                                                <span className="ml-24 bg-white w-52 px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Revenue</span>
                                                <span className="ml-24 bg-white w-52 px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Revenue</span>
                                                <span className="ml-24 bg-white w-52 px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Revenue</span>
                                                <span className="ml-24 bg-white w-52 px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr className="border-white border-2 w-full my-1"/>
                                    <div className="flex flex-col items-center justify-center">
                                        <textarea
                                            className="w-[80%] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8481FA] mb-4"
                                            placeholder="Enter Price"
                                            value={price}
                                            onChange={handlePriceChange}
                                            inputMode="numeric"
                                        ></textarea>
                                        <button
                                            className={`w-[80%] py-2 text-white rounded-md transition-transform ${
                                                price
                                                    ? 'bg-[#8481FA] hover:scale-105'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                            disabled={!price && allocatedItems[selectedItem.id-1] && hold && !bondsBidFor.includes(selectedItem.id-1)}
                                            onClick={() => {
                                                handleNewBid(selectedItem.id, selectedItem.highestBid);
                                                setHold(true);
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-full text-center">
                                    <h1 className="text-xl text-black">No Item Selected</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isOverlayOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
                    <div className="flex flex-col h-[72vh] w-[90%] md:w-[70%] lg:w-[50%] border-white border-4 rounded-xl shadow-xl overflow-hidden bg-[#6865C9] text-white items-center justify-center">
                        {/* Header */}
                        <div className="text-2xl font-bold h-[15%] w-full text-center pt-6">
                            Do You Wish To Apply For Loan ?
                        </div>
                        <div
                            className="py-[6%] text-md font-extrabold h-[85%]"
                            style={{
                                background: 'linear-gradient(180deg, #FFE35B 34.65%, #FFBA4C 77.17%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Please fill out the loan application form. &nbsp;
                            <button
                                className="px-4 py-2 font-semibold shadow-lg transition-transform transform bg-[#8381E7] text-white hover:scale-105 hover:bg-[#5754b3] border rounded-md"
                                onClick={closeOverlay}
                                style={{
                                    border: '2.84px solid',
                                    borderImageSource: 'linear-gradient(101.11deg, #DAC9FF 38.45%, rgba(148, 120, 153, 0) 86.99%)',
                                    borderImageSlice: 1,
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>    
                </div>
            )}
        </div >
    );
}