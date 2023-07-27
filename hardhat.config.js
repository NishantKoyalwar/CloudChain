require('dotenv').config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks :{
    hardhat :{
      chainId : 1337,
    },
    sepolia :{
      url : process.env.URL, 
      accounts : [process.env.PRIVATE_KEY]

    }
  },
  paths :{
    artifacts : "./client/src/artifacts",
    
  },
};
