// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GalloToken is ERC20, Ownable {

    address payable public minter;
    uint256 hardcap = 200000000;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    }

    function decimals() override public view returns (uint8) {
        return 18;
    }

    modifier onlyMinter() {
        require(msg.sender == minter);
        _;
    }

    function updateMinter(address minterAddress) public onlyOwner {
        minter = payable(minterAddress);
    }

    function mint(address to, uint256 amount) public onlyMinter {
        uint256 ts = ERC20.totalSupply() + amount;

        require(ts <= hardcap, "total supply already reached to 200M");

        _mint(to, amount);
    }

    function transferToken(address to, uint256 amount) internal {
        transfer(to, amount);
    }

    string public US_SEC_EDGAR_CIK = "000195425";

}