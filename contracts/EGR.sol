// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EGR is ERC20 {
    constructor(uint256 amount) ERC20("EGOR", "EGR") {
        _mint(msg.sender, amount);
    }
}
