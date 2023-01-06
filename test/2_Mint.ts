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

        //Deploy KerberusVault.sol
        RB = await RB.deploy();
        await RB.deployed();
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

    it("Mint 30", async function () {
        await RB.connect(addr2).claim(30);
 
        expect(await RB.totalSupply()).to.equal(30);
        expect(await RB.ownerOf(0)).to.equal(addr2.address);
        expect(await RB.ownerOf(1)).to.equal(addr2.address);
        expect(await RB.ownerOf(2)).to.equal(addr2.address);
        expect(await RB.ownerOf(3)).to.equal(addr2.address);
        expect(await RB.ownerOf(4)).to.equal(addr2.address);
        expect(await RB.ownerOf(29)).to.equal(addr2.address);
    });

    it("Group Mint 200", async function () {
        await RB.claim(30);
        await RB.connect(addr1).claim(30);        
        await RB.connect(addr2).claim(30);
        await RB.claim(30);
        await RB.connect(addr1).claim(30);        
        await RB.connect(addr2).claim(30);
        await RB.claim(20);

        expect(await RB.totalSupply()).to.equal(200);
        expect(await RB.balanceOf(addr1.address)).to.equal(60);
        expect(await RB.balanceOf(addr2.address)).to.equal(60);
        expect(await RB.balanceOf(owner.address)).to.equal(80);
    });
});