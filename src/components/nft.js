import React, { useState } from "react";
import { getNFTs } from "../methods";
import Search from "./search";

const NFTs = () => {
    const [accountNFTs, setAccountNFTs] = useState([]); // Store Account NFTs in Array
    const [isLoading, setIsLoading] = useState(false);  

    // Handle Search Input Field Validation 
    const handleSearch = async (inputValues) => {
        if (!inputValues) {
            alert("Please enter an address");
            return;
        }
        setIsLoading(true);

        // Get NFTs owned by address
        const _NFTs = await getNFTs(inputValues);
        setAccountNFTs(_NFTs.ownedNfts);
        setIsLoading(false);
    };

    // Component to Display image if URL is active
    function NFTContent(prop) {           
        if (prop.nft.rawMetadata.image){
            if (prop.nft.rawMetadata.image.includes("ipfs://")){
                return <span></span>
            }else{
                return <img src={ prop.nft.rawMetadata.image } alt={ prop.nft.rawMetadata.name } title={ prop.nft.rawMetadata.name } className="NFTImage" />;
            }            
        }else{
            return <span></span>
        }
    }

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
                    ) : (
                        <div>
                            <div className="text-center p-3">
                                <div className="h6 ">This Account Owns {accountNFTs.length} NFTs</div>
                                {accountNFTs.map((item) => <NFTContent nft={item} />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NFTs;