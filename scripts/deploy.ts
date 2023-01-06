import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  let RB = await ethers.getContractFactory("RizzedBears");
  RB = await RB.deploy();
  await RB.deployed();

  console.log("\n -- Rizzed Bears --\n");
  console.log("RB address:", RB.address, "\n");

  saveFrontendFiles(RB.address);
}


function saveFrontendFiles(RB_address: any) {
  const fs = require("fs");
  const contractsDir = __dirname + "";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/abi/contract-addresses.json",
    JSON.stringify({ RB: RB_address}, undefined, 2)
  );

  let RBArtifact = artifacts.readArtifactSync("RizzedBears");

  fs.writeFileSync(
    contractsDir + "/abi/RB.json",
    JSON.stringify(RBArtifact, null, 2)
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
