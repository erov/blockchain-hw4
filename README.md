# UniswapV2 tokens swap

## Explanation 
Exchanges two tokens via swap-pair. For example I take my own custom tokens ERV and EGR and work with them on Mainnet fork via Hardhat.

## Preparing
```
npm install --save-dev hardhat
npx install @uniswap/v2-core
```

## Usage
```
export ALCHEMY_TOKEN=<YOUR ALCHEMY TOKEN>
export LATEST_BLOCK=<BLOCK FOR MAINNET FORK>
npx hardhat test
```

## Sample of usage
```
$ npx hardhat test


  Two tokens deployment test
ERV token deployed at 0x707531c9999AaeF9232C8FEfBA31FBa4cB78d84a
EGR token deployed at 0x2538a10b7fFb1B78c890c870FC152b10be121f04
    ✔ ERV Token balance & supply test
ERV token deployed at 0x24432a08869578aAf4d1eadA12e1e78f171b1a2b
EGR token deployed at 0xdB05A386810c809aD5a77422eb189D36c7f24402
    ✔ EGR Token balance & supply test

  Uniswap test
ERV token deployed at 0xbf2ad38fd09F37f50f723E35dd84EEa1C282c5C9
EGR token deployed at 0xF66CfDf074D2FFD6A4037be3A669Ed04380Aef2B
UniswapV2Factory address: 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
    ✔ Pair creation test
ERV token deployed at 0x20d7B364E8Ed1F4260b5B90C41c2deC3C1F6D367
EGR token deployed at 0xf5C3953Ae4639806fcbCC3196f71dd81B0da4348
UniswapV2Factory address: 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
Transferred 2 ERV from Owner to Pair
Transferred 10 EGR from Owner to Pair
Mint Pair 2 ERV and 10 EGR tokens.
Transferred 4 ERV from Owner to Pair
Swapped 1 ERV to 5 EGR on Owner address
Take back owner's liquidity tokens
Pair tokens were burned

Owner liquidity after burning: 0
Owner ERV tokens: 46999999999999998658
Owner EGR tokens: 46999999999999998881
Pair liquidity: 0
Pair fee in ERV: 1342
Pair fee in EGR: 1119
    ✔ Pair swap test for 1 ERV = 5 EGR (199ms)


  4 passing (4s)



```
