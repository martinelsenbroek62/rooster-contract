import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { string } from "hardhat/internal/core/params/argumentTypes";

describe("Contracts", function () {

  /*
     We define a fixture to reuse the same setup in every test.
     We use loadFixture to run this setup once, snapshot that state,
     and reset Hardhat Network to that snapshot in every test.
     */

  async function deploy() {

    // Contracts are deployed using the first signer/account by default
    const accounts = await ethers.getSigners();

    const saleToken = await (await ethers.getContractFactory("SaleToken")).connect(accounts[1]).deploy("GALLO", "GALLO");
  
    console.log("Contract Address", saleToken.address);

    return { saleToken };
  }

  describe("Token Testing", function () {

    it("check deployment detail", async function () {
      const { saleToken } = await loadFixture(deploy);

      const accounts = await ethers.getSigners();
      console.log("account: ", accounts[1].address, accounts[2].address);

      const name = await saleToken.name();
      const symbol = await saleToken.symbol();
      const totalSupply = await saleToken.totalSupply();
      console.log("totalSupply: ", totalSupply);
  
    });
  });
});