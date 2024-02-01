import React, { useState } from "react";
import { Utils } from "alchemy-sdk";
import { getAccountEthBalance } from "../methods";
import Search from "./search";

const AccountBalance = () => {
    const [accountBalance, setAccountBalance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);  
    const [EthRate, setEthRate] = useState(""); // Store Ethereum Price in USD

    // Get current ETH price in USD
    (async () => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
                setEthRate(JSON.parse(xmlHttp.response).USD);   
            }                
        }
        xmlHttp.open("GET", "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD", true); // true for asynchronous 
        xmlHttp.send(null);             
    })();

    // Handle Search Input Field Validation 
    const handleSearch = async (inputValues) => {
        if (!inputValues) {
            alert("Please enter an address");
            return;
        }
        setIsLoading(true);

        // Get account Ethereum balance
        const balance = await getAccountEthBalance(inputValues);
        setAccountBalance(balance.toString());
        setIsLoading(false);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <Search
                        handleSearch={handleSearch}
                        placeholder="Address . . ."
                        name="address"
                    />
                    {isLoading ? (
                        <div className="spinner-border text-muted"></div>
                    ) : accountBalance === null ? (
                        <div className="text-center">
                            Enter your Ethereum address{" "}
                        </div>
                    ) : (
                        <div>
                            <div className="text-center p-3">
                                <div className="h6 ">Your Account Balance:{" "}</div>
                                <span className="" >
                                <i className="fa-brands fa-ethereum"></i>  {Utils.formatEther(accountBalance)}  - ( ${(EthRate * parseFloat(Utils.formatEther(accountBalance))).toFixed(2)} )
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountBalance;