pragma solidity ^0.8.9;

import "./GalloToken.sol";


contract SaleToken is GalloToken {
    IERC20 usdc;
    IERC20 dai;
    IERC20 usdt;
    IERC20 gemini;
    
    enum coins {
        usdc,
        dai,
        usdt,
        gemini
    }

    constructor(string memory _name, string memory _symbol) GalloToken(_name, _symbol) {
        usdc = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);
        dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
        usdt = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
        gemini = IERC20(0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd);
    }

    function buy(coins c, uint256 amount) public {
        uint256 rate = 500000000000000000;
        if(c == coins.usdc){
          usdc.transferFrom(msg.sender, address(this), amount * rate);
          GalloToken.transferToken(msg.sender ,amount);
        }

        if(c == coins.dai){
          dai.transferFrom(msg.sender, address(this), amount * rate);
          GalloToken.transferToken(msg.sender ,amount);
        }

        if(c == coins.usdt){
          usdt.transferFrom(msg.sender, address(this), amount * rate);
          GalloToken.transferToken(msg.sender ,amount);
        }

        if(c == coins.gemini){
          gemini.transferFrom(msg.sender, address(this), amount * rate);
          GalloToken.transferToken(msg.sender ,amount);
        }
    }
}