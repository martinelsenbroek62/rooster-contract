// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./QBUX.sol";
import "./ERC1155Token.sol";

contract MainContract is QBUX, ERC1155Token {

    event WinLose(address indexed loseAddress, address indexed winAddress, uint256 tokenId);
    event BUYNFT(address indexed userAddress, uint256 tokenId, uint256 amount);

    address ownerContract;

    constructor() {
        ownerContract = msg.sender;
    }

    function getOwnerAddress() public view returns (address) {
        return ownerContract;
    }

    mapping(address => uint256) public record;

    modifier onlyContractOwner() {
        require(ownerContract == msg.sender, "Not the Owner");
        _;
    }

    function startGame(uint256 tokenId) public {
        require(ERC1155Token.ofBalance(msg.sender, tokenId) != 0 , "Address has not the given tokenID NFT");
        ERC1155Token.transfer(msg.sender, ownerContract, tokenId, 1);

        record[msg.sender] = tokenId;
    }

    function nftTransfer(address from, address to, uint256 id, uint256 amount) public {
        ERC1155Token.transfer(from, to, id, amount);
    }

    function buyNFT(uint256 id, uint256 amount) public {
        require(QBUX.balance(msg.sender) > 0 , "You have insufficient balance");
        // for example: 1 NFT price equal to 1 QBUX Token

        // Require the approval for sending token from Web3
        QBUX.fromTransfer(msg.sender, ownerContract, amount);

        // NFT transfer from owner address to the user address
        ERC1155Token.transfer(ownerContract, msg.sender, id, amount);

        emit BUYNFT(msg.sender, id, amount);
    }

    function winLose(address loseAddress, address winAddress) public onlyContractOwner {
        require(record[loseAddress] != 0 && record[winAddress] != 0, "Addresses not participate in the game");
        uint256 loserNFT = record[loseAddress];
        uint256 winNFT = record[winAddress];

        ERC1155Token.transfer(ownerContract, winAddress, loserNFT, 1);
        ERC1155Token.transfer(ownerContract, winAddress, winNFT, 1);

        record[loseAddress] = 0;
        record[winAddress] = 0;

        emit WinLose(loseAddress, winAddress, loserNFT);
    }
}