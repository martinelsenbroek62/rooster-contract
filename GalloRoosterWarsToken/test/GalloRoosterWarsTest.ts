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

    const galloRoosterWars = await (await ethers.getContractFactory("GalloRoosterWars")).connect(accounts[1]).deploy();
  
    console.log("Contract Address", galloRoosterWars.address);

    return { galloRoosterWars };
  }

  describe("GalloRoosterWars Token Testing", function () {

    it("check deployment detail", async function () {
      const { galloRoosterWars } = await loadFixture(deploy);

      const accounts = await ethers.getSigners();
      console.log("account: ", accounts[1].address, accounts[2].address);

      const decimals = await galloRoosterWars.decimals();
      const name = await galloRoosterWars.name();
      const symbol = await galloRoosterWars.symbol();
      const totalSupply = await galloRoosterWars.totalSupply();
      console.log("totalSupply: ", totalSupply);

      const ts = 1000000000 * Math.pow(10, decimals);
   
      expect(decimals).to.equal(8);
      expect(name).to.equal("Gallo Rooster Wars");
      expect(symbol).to.equal("GALLO");
      expect(totalSupply).to.equal(BigInt(ts));
    });

    it("transfer token to another account", async function () {
      const { galloRoosterWars } = await loadFixture(deploy);

      const accounts = await ethers.getSigners();
      const amount = 500000000;
      const totalSupply = 1000000000 * Math.pow(10, 8);;
      const remainingAmount = totalSupply - amount;

      await galloRoosterWars.connect(accounts[1]).transfer(accounts[2].address, 500000000);
      
      const balance = await galloRoosterWars.balanceOf(accounts[2].address);
      console.log("balance account 2: ", balance);

      const balanceA1 = await galloRoosterWars.balanceOf(accounts[1].address);
      console.log("balance account 1: ", balanceA1);
   
      expect(balance).to.equal(amount);
      expect(balanceA1).to.equal(BigInt(remainingAmount));
    });

    it("check the balance of owner account", async function () {
      const { galloRoosterWars } = await loadFixture(deploy);

      const accounts = await ethers.getSigners();
      const amount = 1000000000 * Math.pow(10, 8);;

      const balance = await galloRoosterWars.balanceOf(accounts[1].address);
      console.log("balance account 1: ", balance);
  
      expect(balance).to.equal(BigInt(amount));
    });

  });
});