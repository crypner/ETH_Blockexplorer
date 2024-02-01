import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Sign up for an Alchemy API Key - https://auth.alchemy.com/
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

// The below functions all utilise the Alchemy SDK - https://docs.alchemy.com/reference/
// Get Last 20 BLock Numbers
export const getBlocks = async () => {    
        const lastBlocks = [];
        const latestBlock = await alchemy.core.getBlockNumber();
        let block = latestBlock;
        while (block > latestBlock - 20) {
            lastBlocks.push(block);
            block--;
        }    
        return lastBlocks;
};

// Get Lastest 50 Block Transactions
export const getTxs = async (BlockNumber) => {
    const _transactions = [];
    const latestBlock = await alchemy.core.getBlock(BlockNumber);
    for (let txHash of latestBlock.transactions.slice(0, 50)) {
        const tx = await alchemy.transact.getTransaction(txHash);
        _transactions.push(tx.hash);
    }
    return _transactions;
};

// Get Transaction Data Object
export const getTransaction = async (txhash) => {
    const tx = await alchemy.transact.getTransaction(txhash);
    return tx;
};

// Get Account Balance
export const getAccountEthBalance = async (address) => {
    const balance = await alchemy.core.getBalance(address, "latest");
    return balance;
};

// Get All NFTs Owned by Account Address
export const getNFTs = async (address) => {
    const _NFTs = await alchemy.nft.getNftsForOwner(address);
    console.log(_NFTs)
    return _NFTs;
};