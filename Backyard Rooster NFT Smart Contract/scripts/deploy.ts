import { ethers } from "hardhat";

async function main() {
  const MainContract = await ethers.getContractFactory("MainContract");
  const mainContract = await MainContract.deploy();

  await mainContract.deployed();

  console.log(`deployed to ${mainContract.address}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
