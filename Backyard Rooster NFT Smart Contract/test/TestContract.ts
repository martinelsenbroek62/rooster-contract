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

    const mainContract = await (await ethers.getContractFactory("MainContract")).connect(accounts[1]).deploy();
  
    console.log("Contract Address", mainContract.address);

    return { mainContract };
  }

  describe("Testing", function () {

    it("Check NFT minted Test", async function () {
      const { mainContract } = await loadFixture(deploy);

      const accounts = await ethers.getSigners();

      console.log("account: ", accounts[1].address, accounts[2].address);

      const contractOwnerAddress = await mainContract.getOwnerAddress();
      const ofBalance = await mainContract.ofBalance(accounts[1].address, 1);


      console.log("contractOwnerAddress", contractOwnerAddress);
      console.log("ofBalance", ofBalance);

      expect(contractOwnerAddress).to.equal(accounts[1].address);
      expect(ofBalance).to.equal(1);
    });

    it("Start Game", async function () {
      const { mainContract } = await loadFixture(deploy);

      const accounts = await ethers.getSigners();
      const contractAddress = mainContract.address;

      console.log("Contract Address", contractAddress);
      const tokenID = 1; 

      
      // await mainContract.connect(accounts[1]).setApprovalForAll(contractAddress, true);

      await mainContract.connect(accounts[1]).nftTransfer(accounts[1].address, accounts[2].address, tokenID, 1);

      const ret1 = await mainContract.ofBalance(accounts[2].address, tokenID);

      console.log("balance", ret1);

      // await mainContract.connect(accounts[2]).setApprovalForAll(contractAddress, true);

      await mainContract.connect(accounts[2]).startGame(tokenID);

      const record = await mainContract.record(accounts[2].address);

      console.log("record", record);

      expect(record).to.equal(tokenID);
    });

    it("Win Lose game test case", async function () {
      const { mainContract } = await loadFixture(deploy);

      const accounts = await ethers.getSigners();
      const contractAddress = mainContract.address;

      console.log("Contract Address", contractAddress);
      const tokenID1 = 1;
      const tokenID2 = 2;

      // Transfer to Account 2
      await mainContract.connect(accounts[1]).nftTransfer(accounts[1].address, accounts[2].address, tokenID1, 1);

      const balanceAccount2 = await mainContract.ofBalance(accounts[2].address, tokenID1);
      console.log("balance at account 2", balanceAccount2);

      // start game for Account 2
      await mainContract.connect(accounts[2]).startGame(tokenID1);

      // Transfer to Account 3
      await mainContract.connect(accounts[1]).nftTransfer(accounts[1].address, accounts[3].address, tokenID2, 1);

      const balanceAccount3 = await mainContract.ofBalance(accounts[3].address, tokenID2);
      console.log("balance at account 3", balanceAccount3);

      await mainContract.connect(accounts[3]).startGame(tokenID2);

      const nft = await mainContract.record(accounts[2].address);


      // Let: Lose Address = accounts[2].address
      // Let Win Address = accounts[3].address
      await mainContract.connect(accounts[1]).winLose(accounts[2].address, accounts[3].address);

      // Record
      const record2 = await mainContract.record(accounts[2].address);
      const record3 = await mainContract.record(accounts[3].address);

      console.log("record at account 2", record2);
      console.log("record at account 3", record3);

      const balanceAccount3forID1 = await mainContract.ofBalance(accounts[3].address, tokenID1);
      console.log("balance Account 3 for ID1: ", balanceAccount3forID1);

      expect(record2).to.equal(0);
      expect(record3).to.equal(0);
      expect(balanceAccount3forID1).to.equal(1);
    });

  });
});