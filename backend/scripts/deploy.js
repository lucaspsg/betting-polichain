const hre = require("hardhat");

async function main() {
  const betting = await hre.ethers.deployContract("Betting");
  await betting.waitForDeployment();
  console.log("Contract deployed to ", betting.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
