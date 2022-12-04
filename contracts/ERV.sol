// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERV is ERC20 {
    constructor(uint256 amount) ERC20("EROV", "ERV") {
        _mint(msg.sender, amount);
    }
}
