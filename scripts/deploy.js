const hre = require("hardhat");

let contractAddress;

async function main() {
  
  

  const contract = await hre.ethers.deployContract("Upload");

  await contract.waitForDeployment();

   contractAddress = await contract.getAddress()

  console.log(`Contract deployed at ${contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
