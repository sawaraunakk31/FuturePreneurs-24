const UpgradeAndVenture = () => {
    const upgradeVals = [
        { "Capital Restructuring": "This will affect D/E ratio of the bond" },
        { "Campaigning": "This upgrade affects the REVENUE, NET PROFITS and CASH RESERVES proportionally" },
        { "Expansion and Innovation": "This Upgrade affects the YIELD and RATING of the bond" }
    ];

    return (
        <main className="w-[100vw] h-[100vh] custom-round2 bg-cover bg-no-repeat flex justify-center items-center">
            <div className="bg-gradient-to-b from-[#FFFFFF] via-[#DAD0FF] to-[#FFFFFF] rounded-2xl w-[80vw] h-[90vh] flex flex-col gap-10 border border-black border-10px">
                <nav className="w-full h-[10vh] border bg-gradient-to-b rounded-3xl from-[#807DFC] to-[#461a99] border-black scale-[1.03]"></nav>
                <div className="border-5px w-full h-[80vh] rounded-2xl flex flex-col gap-12 justify-evenly items-center">
                    {/* Flex container for the first two sections */}
                    <div className="flex flex-row justify-between w-[inherit] border border-black">
                        <div className="flex flex-col gap-5 w-[inherit]">
                            <h1 className="text-2xl text-center">Upgrades</h1>
                            <div className="flex flex-col border border-black w-[inherit]">
                                <div className="flex justify-around items-center ">
                                    {upgradeVals.slice(0, 2).map((item, index) => {
                                    const heading = Object.keys(item)[0]; // Get the heading (key)
                                    const details = item[heading]; // Get the corresponding details (value)

                                    return (
                                        <div key={index} className="border border-black p-2 mb-2 rounded w-[20vw]">
                                            <h2 className="font-bold">{heading}</h2>
                                            <p className="text-justify">{details}</p>
                                        </div>
                                    );
                                })}
                                </div>
                                <div className="flex justify-center items-center">
                                {upgradeVals.slice(2,3).map((item, index) => {
                                    const heading = Object.keys(item)[0]; // Get the heading (key)
                                    const details = item[heading]; // Get the corresponding details (value)
                                    
                                    return (
                                        <div key={index} className="border border-black p-2 mb-2 rounded w-[20vw]">
                                            <h2 className="font-bold">{heading}</h2>
                                            <p className="text-justify">{details}</p>
                                        </div>
                                    );
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default UpgradeAndVenture;
