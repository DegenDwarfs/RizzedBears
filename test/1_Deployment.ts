import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deploy & Initiliaze", function () {

  let RB: any;
  let owner: any;
  let addr1: any;
  let addr2: any;
  let addrs: any;

  beforeEach(async function() {
    RB = await ethers.getContractFactory("RizzedBears");

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    //Deploy RizzedBears.sol
    RB = await RB.deploy();
    await RB.deployed();
  });

  it("Validate Deployment", async function () {
    expect(await RB.owner()).to.be.equal(owner.address);
    expect(await RB.mintOpen()).to.be.equal(true);
    expect(await RB.mintLimit()).to.be.equal(5);
  });

  it("Verify Mint Status Switch", async function () {
    expect(await RB.mintOpen()).to.be.equal(true);
    await RB.updateMintStatus();
    expect(await RB.mintOpen()).to.be.equal(false);
  });

  it("Verify Mint Limit Switch", async function () {
    expect(await RB.mintLimit()).to.be.equal(5);
    await RB.updateLimit(10);
    expect(await RB.mintLimit()).to.be.equal(10);
  });

  it("Verify TokenURI", async function () {
    expect(await RB.tokenURI(0)).to.be.equal("ipfs://bafybeidxzi5h7zw7pcm3apcjye26vs6prfgeyllc4qzuqy66rwra367z6i/0.json");
  });
});