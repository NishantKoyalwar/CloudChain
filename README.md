# CloudChain
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

##### Utilizes the IPFS-Pinata system for efficient image storage, while also recording the hash of these images on the blockchain for enhanced security and accessibility.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Install
1. Clone this repo
2. Install hardhat
```
npm install hardhat
```
3. Install dotenv
```
npm install dotenv
```
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Usage
1. export your sepolia RPC url and private key to networks in hardhat.config.js
2. then deploy the contract using
```
npx hardhat run scripts/deploy.js --network sepolia
```
3. Copy the Contract address and paste it in client/src/app.js line 35
4. To start the frontend
```
cd client/
```
```
npm start
```
5. Connect to metamask and you are good to go
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
### Useful Links
[Alchemy](https://www.alchemy.com/)

[pinata](https://www.pinata.cloud/)

[Pinata-Ipfs blog](https://medium.com/pinata/how-to-pin-to-ipfs-effortlessly-ba3437b33885)
