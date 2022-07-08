const ethers = require('ethers');
const fs = require('fs-extra')
require("dotenv").config()
async function main() {
  const abi = fs.readFileSync(__dirname+"/SimpleStorage_sol_simpleStorage.abi", "utf8");
  const bin = fs.readFileSync(__dirname+"/SimpleStorage_sol_simpleStorage.bin", "utf8");

  let provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
  let wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );
  const contractFactory=new ethers.ContractFactory(abi,bin,wallet);
  const contract=await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract deployed to ${contract.address}`) 
  console.log(deploymentReceipt);
  const res=await contract.retrieve();
  console.log(res);
}

main()
  .then(
   console.log("IO")
  )
  .catch((err) => {
    console.log(err);
    
  });
