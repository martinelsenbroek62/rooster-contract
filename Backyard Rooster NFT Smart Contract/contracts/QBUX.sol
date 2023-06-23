// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract QBUX is ERC20, ERC20Burnable {

    address ownerQBUX;

    constructor() ERC20("QBUX", "QBUX") {
        ownerQBUX = msg.sender;
    }

    modifier onlyQBUXOwner() {
        require(ownerQBUX == msg.sender, "Not the Owner");
        _;
    }    

    function mint(address to, uint256 amount) public onlyQBUXOwner {
        _mint(to, amount);
    }

    function balance(address to) public view returns(uint256){
        return balanceOf(to);
    }

    function fromTransfer(address from, address to, uint256 amount) public {
        transferFrom(from, to, amount);
    }
}