import { expect } from "chai";
import { ethers } from "hardhat";

import {BigNumber} from "ethers";
// @ts-ignore
import { abi as UniswapV2FactoryABI } from "@uniswap/v2-core/build/UniswapV2Factory.json";
// @ts-ignore
import { abi as UniswapV2PairABI } from "@uniswap/v2-core/build/UniswapV2Pair.json";

const ZERO_ADDRESS = "0x" + "0".repeat(40);
let owner;
let ervFactory;
let ervToken;
let egrFactory;
let egrToken;

const initAmount = BigNumber.from(10).pow(18).mul(47);

beforeEach(async function () {
    // Get one random account for working with.
    [owner] = await ethers.getSigners();

    // Factories:
    ervFactory = await ethers.getContractFactory("ERV");
    egrFactory = await ethers.getContractFactory("EGR");

    // Tokens deployment:
    ervToken = await ervFactory.deploy(initAmount);
    await ervToken.deployed();
    console.log("ERV token deployed at %s", ervToken.address);
    egrToken = await egrFactory.deploy(initAmount);
    await egrToken.deployed();
    console.log("EGR token deployed at %s", egrToken.address);
});

describe("Two tokens deployment test", function () {
    it ("ERV Token balance & supply test", async function() {
        const ervOwnerBalance = await ervToken.balanceOf(owner.address);
        const ervTokenTotalSupply = await ervToken.totalSupply();
        expect(ervOwnerBalance).to.equal(
            initAmount,
            "owner balance of ERV Token must be equal to initAmount."
        );
        expect(ervTokenTotalSupply).to.equal(
            initAmount,
            "ERV Token total supply must be equal to initAmount."
        );
    });
    it ("EGR Token balance & supply test", async function() {
        const egrOwnerBalance = await egrToken.balanceOf(owner.address);
        const egrTokenTotalSupply = await egrToken.totalSupply();
        expect(egrOwnerBalance).to.equal(
            initAmount,
            "owner balance of EGR Token must be equal to initAmount."
        );
        expect(egrTokenTotalSupply).to.equal(
            initAmount,
            "EGR Token total supply must be equal to initAmount."
        );
    });
});

// Creates UniswapV2Pair contract.
// Returns [contract address, first token of pair, second token of pair].
async function CreateUniswapPair(lhsToken, rhsToken) {
    // Get Factory.
    const uniswapFactory = await ethers.getContractAt(
        UniswapV2FactoryABI,
        "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
    );
    console.log("UniswapV2Factory address: %s", uniswapFactory.address);

    // Ensure token ordering.
    const [fstToken, sndToken] = lhsToken.address < rhsToken.address
        ? [lhsToken, rhsToken]
        : [rhsToken, lhsToken];

    expect(await uniswapFactory.getPair(fstToken.address, sndToken.address)).to.equal(
        ZERO_ADDRESS,
        "Uniswap pair cannot already been existed."
    );

    // Create pair contract.
    const uniswapPairContract = await uniswapFactory.createPair(
        fstToken.address,
        sndToken.address
    );
    console.log("UniswapV2Pair info: %s", uniswapPairContract);

    // Get just created Pair address.
    const uniswapPairAddress = await uniswapFactory.getPair(fstToken.address, sndToken.address);
    expect(uniswapPairAddress).to.not.equal(
            ZERO_ADDRESS,
            "Uniswap piar must exists now."
    );

    return [uniswapPairAddress, fstToken, sndToken];
}

describe("Uniswap test", function () {
    it ("Pair creation test", async function() {
        await CreateUniswapPair(ervToken, egrToken);
    });

    it ("Pair swap test for 1 ERV = 5 EGR", async function() {
        const ervAmount = BigNumber.from(10).pow(18).mul(2);
        const egrAmount = BigNumber.from(10).pow(18).mul(10);

        const [uniswapPairAddress, fstToken, sndToken] = await CreateUniswapPair(ervToken, egrToken);

        // get Pair contract by address:
        const uniswapPair =  await ethers.getContractAt(
            UniswapV2PairABI,
            uniswapPairAddress
        );

        // Make transaction for liquidity 2 ERV & 10 EGR:
        await ervToken.transfer(uniswapPair.address, ervAmount);
        console.log("Transferred 2 ERV from Owner to Pair")
        expect(await ervToken.balanceOf(owner.address)).to.equal(
            initAmount.sub(ervAmount),
            "Owner ERV token amount must decreased on 2 ERV."
        );
        expect(await ervToken.balanceOf(uniswapPair.address)).to.equal(
            ervAmount,
            "Pair ERV token amount must increased on 2 ERV."
        );

        await egrToken.transfer(uniswapPair.address, egrAmount);
        console.log("Transferred 10 EGR from Owner to Pair");
        expect(await egrToken.balanceOf(owner.address)).to.equal(
            initAmount.sub(egrAmount),
            "Owner EGR token amount must decreased on 10 EGR."
        );
        expect(await egrToken.balanceOf(uniswapPair.address)).to.equal(
            egrAmount,
            "Pair EGR token amount must increased on 10 EGR."
        );

        // Mint Pair ERV and EGR tokens & make them reserved.
        expect(await uniswapPair.balanceOf(owner.address)).to.equal(
            BigNumber.from(0),
            "Expected 0 Pair tokens on Owner address."
        );
        await uniswapPair.mint(owner.address);
        console.log("Mint Pair 2 ERV and 10 EGR tokens.");
        expect(await uniswapPair.balanceOf(owner.address)).to.greaterThanOrEqual(
            await uniswapPair.MINIMUM_LIQUIDITY(),
            "Expected owner's liquidity after minting."
        );
        const reserves = await uniswapPair.getReserves();
        const ervTokenId = ervToken.address == await uniswapPair.token0() ? 0 : 1
        expect(await ervToken.balanceOf(uniswapPair.address)).to.equal(
            reserves[ervTokenId],
            "Expected all ERV token becomes reserved."
        );
        expect(await egrToken.balanceOf(uniswapPair.address)).to.equal(
            reserves[(ervTokenId + 1) % 2],
            "Expected all EGR token becomes reserved."
        );

        // Additional transfer ERV tokens for making swap
        await ervToken.transfer(uniswapPair.address, ervAmount.mul(2));
        console.log("Transferred 4 ERV from Owner to Pair")
        expect(await ervToken.balanceOf(owner.address)).to.equal(
            initAmount.sub(ervAmount.mul(3)),
            "Owner's ERV tokens must be decreased on 4 ERV."
        );
        expect(await ervToken.balanceOf(uniswapPair.address)).to.equal(
            ervAmount.mul(3),
            "Expected 6 ERV tokens on Pair address."
        );

        // Swap 1 ERV to 5 EGR
        const [rest0, rest1] = ervTokenId == 0 ? [0, egrAmount.div(2)] : [egrAmount.div(2), 0];
        await uniswapPair.swap(rest0, rest1, owner.address, '0x');
        console.log("Swapped 1 ERV to 5 EGR on Owner address");
        const reservesAfterSwap = await uniswapPair.getReserves();
        expect(reservesAfterSwap[ervTokenId]).to.equal(
            BigNumber.from(10).pow(18).mul(6),
            "Expected all ERV reserve tokens swapped into EGR tokens."
        );
        expect(reservesAfterSwap[(ervTokenId + 1) % 2]).to.equal(
            BigNumber.from(10).pow(18).mul(5),
            "Expected all ERV reserve tokens swapped into EGR tokens."
        );
        expect(await ervToken.balanceOf(uniswapPair.address)).to.equal(
            BigNumber.from(10).pow(18).mul(6),
            "Pair ERV token amount must be equals to 6 ERV."
        );
        expect(await egrToken.balanceOf(uniswapPair.address)).to.equal(
            BigNumber.from(10).pow(18).mul(5),
            "Pair EGR token amount must be equals to 5 EGR."
        );
        expect(await ervToken.balanceOf(owner.address)).to.equal(
            initAmount.sub(ervAmount.mul(3)),
            "Owners ERV Tokens must be increase on 6 ERV from init value"
        )
        expect(await egrToken.balanceOf(owner.address)).to.equal(
            initAmount.sub(egrAmount.div(2)),
            "Owners EGR Tokens must be increase on 5 EGR after swap"
        )

        // Transfer all liquidity tokens to contract address for keeping fee
        // & burn pair for returning deposits.
        await uniswapPair.transfer(uniswapPair.address, await uniswapPair.balanceOf(owner.address))
        await uniswapPair.burn(owner.address);
        console.log("Owner liquidity after burning: %s", await uniswapPair.balanceOf(owner.address));
        expect(await uniswapPair.balanceOf(owner.address)).to.equal(
            0,
            "Owner liquidity after burning must be 0 token"
        );
        console.log("Owner ERV tokens: %s", await ervToken.balanceOf(owner.address));
        console.log("Owner EGR tokens: %s", await egrToken.balanceOf(owner.address));
        console.log("Pair liquidity: %s", await uniswapPair.balanceOf(uniswapPair.address));
        console.log("Pair fee in ERV: %s", await ervToken.balanceOf(uniswapPair.address));
        console.log("Pair fee in EGR: %s", await egrToken.balanceOf(uniswapPair.address));
        expect(await uniswapPair.totalSupply()).to.equal(
            await uniswapPair.MINIMUM_LIQUIDITY(),
            "Pair totalSupply after burning must be MINIMUM_LIQUIDITY() tokens"
        );

    });
});
