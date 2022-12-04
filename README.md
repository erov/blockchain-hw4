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
UniswapV2Pair info: {
  hash: '0x04b2773ad58a2e47c557bcc14fe2469d3337c7d72054683fd27430c4e9ba0cea',
  type: 2,
  accessList: [],
  blockHash: '0xbd6a2ae1c109676ec4c9f2256510b10ee2b42fd071725184cfe17be325e6adc6',
  blockNumber: 16107162,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { value: "5755904651" },
  maxPriorityFeePerGas: BigNumber { value: "1000000000" },
  maxFeePerGas: BigNumber { value: "10511809302" },
  gasLimit: BigNumber { value: "29024088" },
  to: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  value: BigNumber { value: "0" },
  nonce: 359,
  data: '0xc9c65396000000000000000000000000f66cfdf074d2ffd6a4037be3a669ed04380aef2b000000000000000000000000bf2ad38fd09f37f50f723e35dd84eea1c282c5c9',
  r: '0x46a98521711eadc662968c9fb12096c6ef79fcb315f6a217bd0d1847d899345e',
  s: '0x6fe80c1bb440f6d4264e2c0af7f18326baba44508f78f3a4c40801a6ee42e0d8',
  v: 0,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
    ✔ Pair creation test (42ms)
ERV token deployed at 0x20d7B364E8Ed1F4260b5B90C41c2deC3C1F6D367
EGR token deployed at 0xf5C3953Ae4639806fcbCC3196f71dd81B0da4348
UniswapV2Factory address: 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
UniswapV2Pair info: {
  hash: '0x6e70c5cde3b0cc4dfb1b068f3ec039786939bda0422670fbb7b8b15396c3bec0',
  type: 2,
  accessList: [],
  blockHash: '0xb7751bc187df4d366e4df0be94dd5d87136ca4c03260d359531fdb1762f223e5',
  blockNumber: 16107165,
  transactionIndex: 0,
  confirmations: 1,
  from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  gasPrice: BigNumber { value: "4335326955" },
  maxPriorityFeePerGas: BigNumber { value: "1000000000" },
  maxFeePerGas: BigNumber { value: "7670653910" },
  gasLimit: BigNumber { value: "29024088" },
  to: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  value: BigNumber { value: "0" },
  nonce: 362,
  data: '0xc9c6539600000000000000000000000020d7b364e8ed1f4260b5b90c41c2dec3c1f6d367000000000000000000000000f5c3953ae4639806fcbcc3196f71dd81b0da4348',
  r: '0x0a31cd3e6020049cf93469b9d3702823aa2e8baea508c99bc5e4376b5f57080e',
  s: '0x3c9c9003adfb858d582fe5aaee8166cf3064a7e3b2b8c0923843ebe1d65643d9',
  v: 0,
  creates: null,
  chainId: 31337,
  wait: [Function (anonymous)]
}
Transferred 2 ERV from Owner to Pair
Transferred 10 EGR from Owner to Pair
Mint Pair 2 ERV and 10 EGR tokens.
Transferred 4 ERV from Owner to Pair
Swapped 1 ERV to 5 EGR on Owner address
Owner liquidity after burning: 0
Owner ERV tokens: 46999999999999998658
Owner EGR tokens: 46999999999999998881
Pair liquidity: 0
Pair fee in ERV: 1342
Pair fee in EGR: 1119
    ✔ Pair swap test for 1 ERV = 5 EGR (243ms)


  4 passing (4s)

```
