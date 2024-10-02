"use client";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { socket } from "@/app/socket.js";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Bidder() {
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const [allocatedItems, setAllocatedItems] = useState([]);
    const [price, setPrice] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [timeLeft, setTimeLeft] = useState(900);
    const [selectedItem, setSelectedItem] = useState(null);
    const [hold,setHold]=useState(0);
    const router = useRouter();

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value);
        }
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
            const token = session.accessTokenBackend; // Access the backend token
            console.log(token);

            if (socket.connected) {
                console.log("Socket already connected");
                onConnect();
            } else {
                socket.connect(); // First, connect without the token
                socket.on("connect", () => {
                    console.log("Connected to socket");
                    socket.emit("authenticate", { token }); // Send the token in a custom event
                });

                socket.on("authenticated", () => {
                    console.log("Authentication successful");
                });

                socket.on("userDetails", (data) => {
                    console.log("Received user details:", data.user);
                    setWalletBalance(data.user.loan)
                    // You can now use data.user to set any state or perform any action you want
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
        //     setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        // }, 1000);

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("highestBids", setHighestBids);
        socket.on("highestBid", handleNewHighestBid);
        socket.on("syncTimer",({timeLeft:serverTimeLeft})=>{
            setTimeLeft(serverTimeLeft);
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
    }

    const handleNewHighestBid = ({highestBid, index}) => {
        setItems(prevItems => {
            const newItems = [...prevItems]; // Create a copy of the previous items array
            newItems[index] = highestBid;    // Update the item at the specific index
            return newItems;                 // Return the updated array
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
                const newItems = [...prevItems]; // Create a shallow copy of the items array
                newItems[index] = newBidValue; // Update the item at the specific index with the parsed integer value
                return newItems; // Return the updated array
            });
            // Update the selectedItem if the updated item is currently selected
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
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-white-200 to-purple-400">
            <Toaster />
            {loading && <LoadingScreen />}
            <div className="flex flex-col w-[90%] lg:w-[80%] h-[90vh] rounded-xl shadow-2xl bg-white overflow-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center h-[10vh] px-6 py-2 bg-purple-700 text-white">
                    <FaUserCircle className="h-10 w-10" />
                    <div className="text-lg font-semibold">{formatTime(timeLeft)}</div>
                    <div className="text-lg font-semibold">Wallet Balance: ₹{walletBalance}</div>
                </div>

                {/* Main content */}
                <div className="flex w-full h-full">
                    {/* Items Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 w-3/4 bg-gradient-to-br from-white via-purple-100 to-purple-300">
                        {items.map((item, index) => (
                            <div
                                key={index+1}
                                className={`p-4 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out text-center cursor-pointer ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'bg-yellow-300 scale-105'
                                    : 'bg-purple-100 hover:bg-purple-200 hover:scale-105'
                                }`}
                                disabled={allocatedItems[index] || hold}
                                onClick={() => {
                                    if (!allocatedItems[index] && !hold) {
                                        setPrice('');
                                        console.log(allocatedItems[index]);
                                        setSelectedItem(selectedItem && selectedItem.id === item.id ? null : {id: index+1, name: `Item ${index + 1}`, highestBid: item })
                                    } else if ( allocatedItems[index] ) {
                                        alert("This item is already allocated to someone.");
                                    } else {
                                        alert("You are already bidding on an item");
                                    }
                                }}
                            >
                                <h2 className="text-lg font-medium text-purple-800">{`Item ${index + 1}`}</h2>
                                <p className="text-gray-700">Highest: ₹{item}/-</p>
                            </div>
                        ))}
                    </div>

                    {/* Item Details */}
                    <div className="w-1/4 bg-white p-6 flex flex-col justify-between border-l-2 border-gray-300">
                        {selectedItem ? (
                            <>
                                <div className="mb-6">
                                    <h1 className="text-2xl font-semibold text-purple-800">{selectedItem.name}</h1>
                                </div>
                                <div className="mb-6">
                                    <ul className="list-disc list-inside text-gray-700">
                                        <li>ID: {selectedItem.id}</li>
                                        <li>Name: {selectedItem.name}</li>
                                        <li>Price: ₹{items[selectedItem.id-1]}/-</li>
                                    </ul>
                                </div>
                                <div>
                                    <textarea
                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                                        placeholder="Enter Price"
                                        value={price}
                                        onChange={handlePriceChange}
                                        inputMode="numeric"
                                    ></textarea>
                                    <button
                                        className={`w-full py-2 text-white rounded-md transition-transform ${
                                            price
                                                ? 'bg-purple-700 hover:bg-purple-800 hover:scale-105'
                                                : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                        disabled={!price && allocatedItems[selectedItem.id-1] && hold}
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
                                <h1 className="text-xl text-gray-600">No Item Selected</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
