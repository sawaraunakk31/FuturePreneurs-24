"use client";
import { useState, useEffect } from "react";
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
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-white-200 to-purple-400">
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
                        {items.map(item => (
                            <div
                                key={item.id}
                                className={`p-4 rounded-lg shadow-md transform transition-transform duration-300 ease-in-out text-center cursor-pointer ${
                                    selectedItem && selectedItem.id === item.id 
                                    ? 'bg-yellow-300 scale-105'
                                    : 'bg-purple-100 hover:bg-purple-200 hover:scale-105'
                                }`}
                                onClick={() => setSelectedItem(selectedItem && selectedItem.id === item.id ? null : item)}
                            >
                                <h2 className="text-lg font-medium text-purple-800">{item.name}</h2>
                                <p className="text-gray-700">Highest: ₹{item.price}/-</p>
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
                                        <li>Price: ₹{selectedItem.price}/-</li>
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
                                        disabled={!price}
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
