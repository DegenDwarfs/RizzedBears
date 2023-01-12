import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test Minting", function () {

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

    it("Mint", async function () {
        await RB.connect(addr1).claim(1);

        expect(await RB.totalSupply()).to.equal(1);
        expect(await RB.ownerOf(0)).to.equal(addr1.address);
    });

    it("Mint 5", async function () {
        await RB.connect(addr1).claim(5);

        expect(await RB.totalSupply()).to.equal(5);
        expect(await RB.ownerOf(0)).to.equal(addr1.address);
        expect(await RB.ownerOf(1)).to.equal(addr1.address);
        expect(await RB.ownerOf(2)).to.equal(addr1.address);
        expect(await RB.ownerOf(3)).to.equal(addr1.address);
        expect(await RB.ownerOf(4)).to.equal(addr1.address);
    });

    it("Exceed Mint Limit", async function () {
        await expect(RB.connect(addr2).claim(30)).to.be.revertedWithCustomError;
    });
});