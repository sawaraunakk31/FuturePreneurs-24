"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { socket } from "@/app/socket.js";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import back from '../back2.svg';
import file from '@/public/constant/round1/bonds.json';
import { set } from "mongoose";

const TimerOverlay = ({ hold, startTime }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (hold) {
            const currentTime = Date.now();
            const duration = 60 * 1000; // 3 minutes in milliseconds
            const timeRemaining = Math.max(0, Math.floor((startTime + duration - currentTime) / 1000));
            
            setTimeLeft(timeRemaining);
            setIsActive(true);
        } else {
            setIsActive(false);
            setTimeLeft(0);
        }
    }, [hold, startTime]);

    useEffect(() => {
        let timer;

        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            setIsActive(false);
        }

        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    if (!isActive || !hold) return null;

    return (
        <div style={overlayStyles}>
            <div style={timerStyles}>
                {timeLeft > 0 ? (
                    <h1>{`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`} remaining</h1>
                ) : (
                    <h1>Time's up!</h1>
                )}
            </div>
        </div>
    );
};

  const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };
  
  const timerStyles = {
    textAlign: 'center',
  };

export default function Bidder() {
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const [allocatedItems, setAllocatedItems] = useState([]);
    const [price, setPrice] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isFirstHalf, setIsFirstHalf] = useState(true);
    const [isBiddingOver, setIsBiddingOver] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [team, setTeam] = useState("");
    const [hold,setHold]=useState(0);
    const [bondsBidFor, setBondsBidFor] = useState([]);
    const [priceChange, setPriceChange] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    const handlePriceChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
        if (value.length > 10) {
            toast.error('Value cannot exceed 999.99 Cr.', { duration: 500 });
            return;
        }
        setPrice(value);
    };
    
    const divRef = useRef(null);
    useEffect(() => {
        if (isBiddingOver) {
            if (divRef.current) {
                divRef.current.scrollTop = 0;
            }
            setSelectedItem(null);
        }
    }, [isBiddingOver]);

    const router = useRouter();

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
                    if(team.hold && ((Date.now() - team.hold) / 60000 < 1)
                ){
                        setHold(true);
                    }
                    setStartTime(team.hold);

                });
                 
                socket.on("highestBids", setHighestBids);
                socket.on("highestBid", handleNewHighestBid);

                socket.on("auth_error", (err) => {
                    console.error("Authentication error:", err);
                    toast.error("Authentication failed, please log in again.");
                    router.push("/");
                });

                socket.on("start_error", ({message}) => {
                    console.error("Error starting this round:", message);
                    toast.error(`${message}`);
                    router.push("/");
                })
                
                socket.on("isAdmin", ({isAdmin}) =>{setIsAdmin(isAdmin)})

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

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        socket.on("highestBids", setHighestBids);
        socket.on("initialWallet", initialWallet);

        socket.on("HoldFalse", () => setHold(false));
        socket.on("highestBid", handleNewHighestBid);

        socket.on("syncTimer",({timeLeft:serverTimeLeft})=>{
            setTimeLeft(serverTimeLeft);
            if (serverTimeLeft == 450) {
                setIsFirstHalf(false);
            }
            else if (serverTimeLeft == 0) {
                setIsBiddingOver(true);
                toast.error("Bidding is over.");
                setTimeout(10000);
                router.push("./page5");
            }
        })
        
        return () => {
            socket.off("connect", onConnect);
            socket.off("isAdmin");
            socket.off("start_error");
            socket.off("authenticated");
            socket.off("auth_error");
            socket.off("initialWallet");
            socket.off("disconnect", onDisconnect);
            socket.off("highestBids", setHighestBids);
            socket.off("highestBid", handleNewHighestBid);
            socket.off("syncTimer");
            socket.disconnect();
        };
    }, [status]);

    const setHighestBids = ({ highestBids, allocatedBids, bondsBidFor }) => {
        setItems(highestBids);
        setAllocatedItems(allocatedBids);
        setBondsBidFor(bondsBidFor);
    }
    
    const initialWallet = ({wallet}) => {
        setWalletBalance(wallet);
    }
    const handleNewHighestBid = ({highestBid, index}) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = highestBid;
            return newItems;
        });
        setTimeout(1000, setPriceChange(true));
    }

    const handleNewBid = (ID, currentBid) => {
        const index = ID-1;
        const newBidValue = parseInt(price);
        if (isNaN(newBidValue) || newBidValue <= 0) {
            toast.error("Please enter a valid bid amount.");
            setHold(false);
            return;
        } else if (newBidValue > (0.9*walletBalance)) {
            toast.error("You can only bid 90% of your wallet amount.");
            setHold(false);
            return;
        } else if (newBidValue < (50000000)) {
            toast.error("You need to atleast bid ₹5Cr.");
            setHold(false);
            return;
        } else if (newBidValue > (9999900000)) {
            toast.error("You can max bid ₹999.99Cr.");
            setHold(false);
            return;
        } else if (currentBid<newBidValue) {
            socket.emit("newBid", {newBid: newBidValue, index});
            
            setPriceChange(true);

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
            toast.error("Your bid is lower than the current highest bid.");
            setHold(false);
            setPrice("");
          }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getObject = (id) => {
        const obj = file.find(item => item.id == id);
        return obj ? obj : null;
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
                    <div
                        className="px-4 py-1.5 bg-[#FFE55B] text-[#573712] rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C]"
                    >
                        Wallet: ₹{(walletBalance / 10000000).toFixed(2)}Cr
                    </div>
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
                    @keyframes blink {
                        0% { opacity: 1; }
                        50% { opacity: 0; }
                        100% { opacity: 1; }
                        100% { opacity: 1; }
                    }
                    .blink-text {
                        animation: blink 1s forwards;
                    }
                `}</style>
                <div
                    
                    ref={divRef}
                    className={`flex bg-[#F3F4F6] text-black leading-relaxed w-full h-[72vh] overflow-hidden ${
                        isBiddingOver ? 'pointer-events-none' : ''
                    }`}
                    style={{
                        background: 'linear-gradient(180deg, #FFF 0%, #DAD0FF 47%, #FFF 100%)',
                    }}>
                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 p-8 w-3/4 overflow-y-auto hide-scrollbar">
                        {items.map((item, index) => (
                            <div
                                key={index+1}
                                className={`p-4 justify-center rounded-2xl shadow-lg transform transition-transform duration-300 ease-in-out text-center cursor-pointer border-white border-4 ${
                                    (isFirstHalf && index >= 25)
                                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                    : selectedItem && selectedItem.id === index+1 
                                    ? 'bg-[#8481FA] scale-110 transition-transform cursor-pointer'
                                    : 'bg-[linear-gradient(114deg,rgba(232,232,232,0.10)_15.11%,rgba(0,56,255,0.10)_81.96%)] hover:scale-105 cursor-pointer'
                                }`} 
                                disabled={(isFirstHalf && index >= 25) || allocatedItems[index] || hold || bondsBidFor.includes(index)}
                                onClick={() => {
                                    if ((!isFirstHalf || index <= 25) && !allocatedItems[index] && !hold && !bondsBidFor.includes(index)) {
                                        setPrice('');
                                        setSelectedItem(selectedItem && selectedItem.id === item.id ? null : {id: index+1, obj: getObject(index+1), highestBid: item })
                                    } else if ( allocatedItems[index] ) {
                                        toast.error("This item is already allocated to someone.");
                                    } else if ( bondsBidFor.includes(index) ) {
                                        toast.error("You have already bid on this item");
                                    } else if ( isFirstHalf && index >= 25 ) {
                                        toast.error("You cannot bid on this item right now");
                                    } 
                                }}
                            >
                                <h2 className={`text-xl font-bold ${
                                    (isFirstHalf && index >= 25)
                                    ? 'text-white'
                                    : selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-[#8481FA]'
                                }`}>{`Bond ${index + 1}`}</h2>
                                <p className={`text-sm pt-2 pb-1 ${
                                    (isFirstHalf && index >= 25)
                                    ? 'text-white'
                                    : selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-black'
                                }`}>Highest Bid</p>
                                <p className={`font-semibold pb-1 px-2 rounded-md w-[100%] ${
                                    (isFirstHalf && index >= 25)
                                    ? 'text-white bg-white'
                                    : selectedItem && selectedItem.id === index+1 
                                    ? 'text-black bg-white'
                                    : 'text-white bg-[#8481FA]'
                                }`}>₹{(item/10000000).toFixed(2)}Cr</p>
                            </div>
                        ))}
                    </div>

                    {/* Item Details */}
                    <div className="w-1/4 p-6 pl-0">
                        <div className="py-4 h-full flex flex-col justify-between bg-[linear-gradient(114deg,rgba(232,232,232,0.10)_15.11%,rgba(0,56,255,0.10)_81.96%)] border-white border-4 shadow-xl rounded-2xl">
                            {selectedItem ? (
                                <>
                                    <div className="text-center h-[10%] pb-4">
                                        <h1 className="text-xl font-bold text-black">{selectedItem.obj.name.length > 24 ? `${selectedItem.obj.name.substring(0, 20)}...` : selectedItem.obj.name}</h1>
                                    </div>
                                    <hr className="border-white border-2 w-full mb-2"/>
                                    <div className="m-2 h-[60%]">
                                        <ul className="list-inside text-black">
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Current Bid</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    ₹ {(selectedItem.highestBid/10000000).toFixed(2)} Cr
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Net Revenue</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    ₹ {(selectedItem.obj.revenue/10000000).toFixed(2)} Cr
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Net Profit</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    ₹ {(selectedItem.obj.profit/10000000).toFixed(2)} Cr
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Yield</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    {selectedItem.obj.yield}
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Rating</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    {selectedItem.obj.rating}
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>D/E Ratio</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    {selectedItem.obj.ratio}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr className="border-white border-2 w-full mt-2"/>
                                    <div className="flex flex-col items-center justify-center h-[30%]">
                                        <input
                                            type='text'
                                            step='100000'
                                            className="my-5 p-2 border w-[80%] border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFE55B] text-[#573712]"
                                            placeholder="Enter the Bid"
                                            value={price}
                                            onChange={handlePriceChange}
                                        />
                                        <button
                                            className={`w-[80%] py-2 text-white rounded-md transition-transform ${
                                                price
                                                    ? 'bg-[#8481FA] hover:scale-105'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                            disabled={!price && allocatedItems[selectedItem.id-1] && hold && !bondsBidFor.includes(selectedItem.id-1)}
                                            onClick={() => {
                                                setHold(true);
                                                setTimeout(()=>{
                                                    setHold(false);
                                                },60000)
                                                setStartTime(Date.now());
                                                handleNewBid(selectedItem.id, selectedItem.highestBid);
                                                
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-full text-center">
                                    <h1 className="text-xl text-black mb-5">No Item Selected</h1>
                                    {isAdmin?
                                        <button
                                            className={`w-[80%] py-2 text-white rounded-md transition-transform ${
                                                isAdmin
                                                    ? 'bg-[#8481FA] hover:scale-105'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                            }`}
                                            onClick={() => {
                                                socket.emit("startTimer");
                                            }}
                                        >
                                                Admin Start Timer
                                        </button> :
                                        null
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <TimerOverlay hold={hold} startTime={startTime}></TimerOverlay>
        </div >
    );
}