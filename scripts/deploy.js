const hre = require("hardhat");

let contractAddress;

async function main() {
  
  

  const contract = await hre.ethers.deployContract("Upload");

  await contract.waitForDeployment();

   contractAddress = await contract.getAddress()

  console.log(`Contract deployed at ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
