import { ethers } from "hardhat";

async function main() {
  const GalloRoosterWars = await ethers.getContractFactory("GalloRoosterWars");
  const galloRoosterWars = await GalloRoosterWars.deploy();

  await galloRoosterWars.deployed();

  console.log(`deployed to ${galloRoosterWars.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
