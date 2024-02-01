# Ethereum Block Explorer

This Ethereum Block explorer utilizes the Alchemy SDK for interacting with the Ethereum Blockchain.

Main Functions:
- Gets The last 20 mined blocks on the Ethereum Blockchain and pulls the latest 50 transactions from each block.
- Gets Account Balance in ETH and USD equivalent
- Gets List of NFTs owned by account address


## Getting Started

### 1. Create a unique Alchemy API key

If you have not already done so, create a unique Alchemy API Mainnet key
for your project as [described here](https://auth.alchemy.com/).

### 2. Add your API key to as an environment variable for the project

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your api key.

```sh
REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

Do not remove the `REACT_APP_` prefix. React uses that to import env variables.

**⚠️ Note**

> Your Alchemy API Mainnet Key is a sensitive piece of data. If we were\
> building an enterprise app to conquer the world we would never place\
> this sensitive data in the client code of our blockexplorer project that\
> could potentially be read by anyone.

### 3. Install Project

`npm install`

Running the command above will intall all the needed dependencies for the application to run smoothly (Hopefully)

### 4. Start the webserver

`npm start`

Running the command above will run the app in the development mode. This command should open a new tab in your browser with the running app but if it does not do so automatically, open your preferred browser and go to [http://localhost:3000](http://localhost:3000).

The webpage will automatically reload/update when you apply any code changes.

### 5. Application Current Features

**Index Tab - Latest Blocks**

This tab pulls the last 20 blocks mined on the Ethereum Mainnet. You may notice the top block number is selected. On the right are the latest 50 transactions of the selected block.

By selecting any of the other blocks u will load their latest 50 transactions.

If you click on any of the transactions a modal will open with the transaction details - Transaction Hash, Nonce, From and To, the value transfered and Gas fees.

**Account Tab**

The account tab lets you input an Ethereum address and returns its Balance in Eth and also calculates its value in USD

**NFTs Tab**

Similar to the account tab the NFTs tab lets you input an Ethereum address and returns how many NFTs does that account own and if the NFTs are Images the app displays them in a grid.



===========================================================================

## Additional Info

To add more features to this project find out more about the [Alchemy SDK Surface docs](https://docs.alchemy.com/reference/alchemy-sdk-quickstart). 


Good luck and have fun!
