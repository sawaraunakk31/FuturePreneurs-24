{/* Main content */}
<div className="flex w-full h-full">
    {/* Items Grid */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6 w-3/4 bg-gradient-to-br from-white via-purple-100 to-purple-300">
        {items.map((item, index) => (
            <div>
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