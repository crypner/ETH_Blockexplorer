import { useState, useMemo } from "react";
import { getBlocks, getTxs, getTransaction } from "../methods";
import { Utils } from "alchemy-sdk";

const Blocks = () => {
    const [blocks, setBlocks] = useState([]); // Latest blocks array
    const [txs, setTxs] = useState([]); // Block Transactions Array
    const [activeBlock, setActiveBlock] = useState(""); // Store current active block
    const [activeTX, setActiveTX] = useState(""); // Store current active transaction object
    const [activeTXHash, setActiveTXHash] = useState(""); // Store current active transaction hash
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

    // Set active block class element
    function setBlockActive(blk){
        if(document.querySelectorAll("BlockActive").length > 1){
            document.querySelector("BlockActive").classList.remove("BlockActive")
        }
        if(blk){
            document.getElementById("_" + blk).classList.add("BlockActive");
        }         
    }

    useMemo(() => setBlockActive(activeBlock), [activeBlock]);

    // Only initiate blocks if blocks array is empty.
    if(blocks.length === 0){
        (async () => {
            const _blocks = await getBlocks();        
            setBlocks(_blocks);
            setActiveBlock(blocks[0])
            handleBlockTXs(blocks[0])            
        })();
    }  

    // Get transactions of selected block
    const handleBlockTXs = async (blockNumber) => {
        setActiveBlock(blockNumber)
        setTxs([]);
        const _TXs = await getTxs(blockNumber);
        setTxs(_TXs);
    };

    // Get transaction data to populate modal
    const handleTXs = async (Txhash) => {
        setActiveTXHash(Txhash);
        setActiveTX("");
        const _TX = await getTransaction(Txhash);
        setActiveTX(_TX);
    };

    // Block component to populate Block list from Array
    function BlockContent(prop) {
        let genID = "_" + prop.blockNum
        if (activeBlock === undefined){
            if (blocks[0] === prop.blockNum){ 
                return <p id={ genID } className="block BlockActive" onClick={() => handleBlockTXs(prop.blockNum)}><i className="fa-solid fa-cube"></i> { prop.blockNum }</p>;
            }else{
                return <p id={ genID } className="block" onClick={() => handleBlockTXs(prop.blockNum)}><i className="fa-solid fa-cube"></i> { prop.blockNum }</p>;
            }
        }else{
            if (activeBlock === prop.blockNum){ 
                return <p id={ genID } className="block BlockActive" onClick={() => handleBlockTXs(prop.blockNum)}><i className="fa-solid fa-cube"></i> { prop.blockNum }</p>;
            }else{
                return <p id={ genID } className="block" onClick={() => handleBlockTXs(prop.blockNum)}><i className="fa-solid fa-cube"></i> { prop.blockNum }</p>;
            }
        }
    }

    // Transaction Component to populate transactions list from Array
    function BlockTransaction(prop) {
        return <p data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => handleTXs(prop.hash)}><i className="fa-brands fa-hashnode"></i> { prop.hash }</p>;
    }
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <div className="BlocksTitle">
                        Latest Blocks
                    </div>

                    {blocks.length ? (
                        blocks.map((item) => <BlockContent blockNum={item} />)
                    ) : (
                        <div className="spinner-border text-muted"></div>
                    )}
                </div>
                <div className="col-md-10">
                    <div className="BlocksTitle">
                        Block Transactions
                    </div>
                    <div className="TxsList">
                        {txs.length ? (
                            txs.map((item) => <BlockTransaction hash={item} />)
                        ) : (
                            <div className="spinner-border text-muted"></div>
                        )}
                    </div>
                    

                </div>
            </div>
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title"><strong>Transaction: </strong>{activeTXHash.slice(0,7)}...{activeTXHash.slice(activeTXHash.length-5,activeTXHash.length)}</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            {activeTX ? (
                                <div>
                                    <p><strong>Block Number: </strong> {activeTX.blockNumber}</p>
                                    <p><strong>Block Hash: </strong><br />{activeTX.hash}</p>
                                    <p><strong>Nonce: </strong> {activeTX.nonce}</p>
                                    <hr />
                                    <p><strong>From: </strong> {activeTX.from}</p>
                                    <p><strong>To: </strong> {activeTX.to}</p>
                                    <p><strong>Value: </strong> <i className="fa-brands fa-ethereum"></i>  {Utils.formatEther(activeTX.value)}  - ( ${(EthRate * parseFloat(Utils.formatEther(activeTX.value))).toFixed(2)} )</p>
                                    <hr />
                                    <p><strong>Max Fee Per Gas: </strong> <i className="fa-brands fa-ethereum"></i>  {Utils.formatEther(activeTX.maxFeePerGas)}  - ( ${(EthRate * parseFloat(Utils.formatEther(activeTX.maxFeePerGas))).toFixed(2)} )</p>                                    
                                    <p><strong>Max Priority Fee Per Gas: </strong> <i className="fa-brands fa-ethereum"></i>  {Utils.formatEther(activeTX.maxPriorityFeePerGas)}  - ( ${(EthRate * parseFloat(Utils.formatEther(activeTX.maxPriorityFeePerGas))).toFixed(2)} )</p>
                                    <hr />
                                    <p><strong>Gas Price: </strong> <i className="fa-brands fa-ethereum"></i>  {Utils.formatEther(activeTX.gasPrice)}  - ( ${(EthRate * parseFloat(Utils.formatEther(activeTX.gasPrice))).toFixed(2)} )</p>                                    
                                    <p><strong>Gas Limit: </strong> <i className="fa-brands fa-ethereum"></i>  {Utils.formatEther(activeTX.gasLimit)}  - ( ${(EthRate * parseFloat(Utils.formatEther(activeTX.gasLimit))).toFixed(2)} )</p>
                                </div>
                            ) : (
                                <div className="spinner-border text-muted"></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Blocks;