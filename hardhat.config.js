require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    avalanche: {
      url: "https://avax-fuji.g.alchemy.com/v2/Q8F6ajRM3Z4bFZz6VmEEydGZPS8fCSHJ",
      chainId: 43113,
      accounts: [PRIVATE_KEY],
    },
    // base: {
    //   url: "https://base-sepolia.g.alchemy.com/v2/Q8F6ajRM3Z4bFZz6VmEEydGZPS8fCSHJ",
    //   chainId: 84532,
    //   accounts: [PRIVATE_KEY],
    // },
  },
};
