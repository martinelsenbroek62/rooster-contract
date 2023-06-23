// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract ERC1155Token is ERC1155, Ownable, ERC1155Burnable {
    
    constructor() ERC1155("") {
        _mint(msg.sender, 1, 1, "0x00");
        _mint(msg.sender, 2, 1, "0x00");
        _mint(msg.sender, 3, 1, "0x00");
        _mint(msg.sender, 4, 1, "0x00");
        _mint(msg.sender, 5, 1, "0x00");
        _mint(msg.sender, 6, 1, "0x00");
        _mint(msg.sender, 7, 1, "0x00");
        _mint(msg.sender, 8, 1, "0x00");
        _mint(msg.sender, 9, 1, "0x00");
        _mint(msg.sender, 10, 1, "0x00");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function transfer(address from, address to, uint256 id, uint256 amount) public {
        // Require the approval for transfer the NFT from Web3        
        safeTransferFrom(from, to, id, amount, "0x00");
    }

    function ofBalance(address account, uint256 id) public view returns(uint256) {
        return balanceOf(account, id);
    }
}