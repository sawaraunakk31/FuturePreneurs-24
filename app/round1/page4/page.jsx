"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Bidder() {
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState("");
    const [walletBalance, setWalletBalance] = useState(0);
    const [timeLeft, setTimeLeft] = useState(900);
    const [selectedItem, setSelectedItem] = useState(null);

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const data = Array.from({ length: 25 }, (v, i) => ({
                id: i + 1,
                name: `Item ${i + 1}`,
                price: (i + 1) * 10,
            }));
            setItems(data);
            const wallet = { balance: 1000 };
            setWalletBalance(wallet.balance);
        }
        fetchData();

        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <>
            <div className="flex w-full h-[10vh] border-black border-b-4 items-center justify-between px-4 bg-purple-600 text-white">
                <FaUserCircle className="h-8 w-8" />
                <div className="text-xl font-bold">
                    {formatTime(timeLeft)}
                </div>
                <div className="text-xl font-bold">
                    Wallet Balance: ₹{walletBalance}
                </div>
            </div>
            <div className="flex w-full min-h-[90vh]">
                <div className="grid grid-cols-5 gap-4 p-4 w-3/4 border-black border-r-4 bg-light-blue-200">
                    {items.map(item => (
                        <div
                            key={item.id}
                            className={`p-4 rounded-lg shadow-md transition-transform transform text-center cursor-pointer ${
                                selectedItem && selectedItem.id === item.id 
                                ? 'bg-yellow-300 opacity-100 scale-105' 
                                : 'bg-purple-200 opacity-75 hover:opacity-90 hover:scale-105'
                            }`}
                            onClick={() => setSelectedItem(selectedItem && selectedItem.id === item.id ? null : item)}
                        >
                            <h2 className="text-lg pb-2 text-black">{item.name}</h2>
                            <p className="text-black">Highest : ₹{item.price}/-</p>
                        </div>
                    ))}
                </div>
                <div className="w-1/4 bg-light-green-200">
                    {selectedItem ? (
                        <>
                            <div className="h-1/6 p-6 border-black border-b-4 bg-yellow-500 text-black">
                                <h1 className="text-3xl font-bold mb-6">{selectedItem.name}</h1>
                            </div>
                            <div className="h-3/6 p-6 border-black border-b-4 bg-light-green-300">
                                <ul className="list-disc list-inside grid gap-3 text-black">
                                    <li>ID: {selectedItem.id}</li>
                                    <li>Name: {selectedItem.name}</li>
                                    <li>Price: ₹{selectedItem.price}/-</li>
                                </ul>
                            </div>
                            <div className="h-2/6 p-6">
                                <div className="flex flex-col">
                                    <textarea
                                        className="p-2 mb-4 border rounded-md h-auto resize-none bg-purple-100 text-black"
                                        placeholder="Enter Price"
                                        value={price}
                                        onChange={handlePriceChange}
                                        inputMode="numeric"
                                    ></textarea>
                                    <button
                                        className={`p-2 bg-purple-600 text-white rounded-md ${price ? 'opacity-75 hover:opacity-100' : 'hidden cursor-not-allowed'}`}
                                        disabled={!price}
                                    >Submit</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="h-1/6 p-6 border-black border-b-4 bg-light-green-300">
                                <h1 className="text-3xl font-bold mb-6">No Item Selected</h1>
                            </div>
                            <div className="h-3/6 p-6 border-black border-b-4 bg-light-green-300">
                            </div>
                            <div className="h-2/6 p-6 bg-light-green-300">
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
