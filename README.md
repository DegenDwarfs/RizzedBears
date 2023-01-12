# Rizzed Bears

[![Automated Tests](https://github.com/DegenDwarfs/RizzedBears/actions/workflows/RB.yml/badge.svg)](https://github.com/DegenDwarfs/RizzedBears/actions/workflows/RB.yml)
![GitHub followers](https://img.shields.io/github/followers/degendwarfs?style=social)
![Twitter Follow](https://img.shields.io/twitter/follow/degendwarfs?style=social)

Rizzed Bears is a free mint designed for the Etherscan 201 education course by the Degen Dwarfs.
Learn by minting directly from etherscan, and trade your free NFT on any marketplace.

# Developer Notes 

## Install Requirements

The first steps are to clone the repository and install its dependencies:

```sh
https://github.com/DegenDwarfs/RizzedBears.git
cd RizzedBears
npm install
```

Make a copy of the sample hardhat config file, git ignores the hardhatconfig file.
This file is sensitive, because it may contain private keys
```sh
cp sample.hardhat.config.ts hardhat.config.ts
```

## Test
On a new terminal, go to the repository's root folder and run this to
test the contract:

```sh
npx hardhat test
```

## Deploy Test
On a new terminal, go to the repository's root folder and run this to
deploy the contract test:

```sh
npx hardhat run scripts/deploy.ts --network <network>
```
