// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
   // ethers is available in the global scope
   const [deployer] = await ethers.getSigners();

   const Vault = await ethers.getContractFactory("Vault");
   const vault = await Vault.deploy();
   await vault.deployed();
   await vault.store({ value: ethers.utils.parseEther("5.0") });

   const Attack = await ethers.getContractFactory("AttackVault");
   const attack = await Attack.deploy(vault.address);
   await attack.deployed();

   console.log(
      "Balance of Vault before attack before : ",
      await ethers.utils.formatEther(
         await ethers.provider.getBalance(vault.address)
      )
   );
   await attack.attack({ value: ethers.utils.parseEther("2") });
   console.log(
      "Balance of Vault before attack before : ",
      await ethers.utils.formatEther(
         await ethers.provider.getBalance(vault.address)
      )
   );
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
