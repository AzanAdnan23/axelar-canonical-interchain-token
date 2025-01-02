const hre = require("hardhat");
const crypto = require("crypto");
const {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} = require("@axelar-network/axelarjs-sdk");

const interchainTokenServiceContractABI = require("./utils/interchainTokenServiceABI");
const interchainTokenFactoryContractABI = require("./utils/interchainTokenFactoryABI");
const customTokenContractABI = require("./utils/customTokenABI");

const MINT_BURN = 0;
const LOCK_UNLOCK = 2;

// Addresses on mainnet/testnet
const interchainTokenServiceContractAddress =
  "0xB5FB4BE02232B1bBA4dC8f81dc24C26980dE9e3C";
const interchainTokenFactoryContractAddress =
  "0x83a93500d23Fbc3e82B410aD07A6a9F7A0670D66";
const customTokenAddress = "0x85C5a12A3ae7F47314615a7d1c1Fd805c5E93935"; // your token address

async function getSigner() {
  const [signer] = await ethers.getSigners();
  return signer;
}

async function getContractInstance(contractAddress, contractABI, signer) {
  return new ethers.Contract(contractAddress, contractABI, signer);
}

// Register Canonical Interchain Token to the Avalache chain.
async function registerCanonicalInterchainToken() {
  // Get a signer to sign the transaction
  const signer = await getSigner();

  // Create contract instances
  const interchainTokenFactoryContract = await getContractInstance(
    interchainTokenFactoryContractAddress,
    interchainTokenFactoryContractABI,
    signer
  );
  const interchainTokenServiceContract = await getContractInstance(
    interchainTokenServiceContractAddress,
    interchainTokenServiceContractABI,
    signer
  );

  // Register a new Canonical Interchain Token
  const deployTxData =
    await interchainTokenFactoryContract.registerCanonicalInterchainToken(
      customTokenAddress // Your token address
    );

  // Retrieve the token ID of the newly registered token
  const tokenId =
    await interchainTokenFactoryContract.canonicalInterchainTokenId(
      customTokenAddress
    );

  const expectedTokenManagerAddress =
    await interchainTokenServiceContract.tokenManagerAddress(tokenId);

  console.log(
    `
    Transaction Hash: ${deployTxData.hash},
    Token ID: ${tokenId},
    Expected Token Manager Address: ${expectedTokenManagerAddress},
       `
  );
}

const api = new AxelarQueryAPI({ environment: Environment.TESTNET });

// Estimate gas costs.
async function gasEstimator() {
  const gas = await api.estimateGasFee(
    EvmChain.AVALANCHE,
    EvmChain.BASE_SEPOLIA,
    1000000,
    1.1
  );

  return gas;
}

// deployRemoteCanonicalInterchainToken: On Base
async function deployRemoteCanonicalInterchainToken() {
  // Get a signer for authorizing transactions
  const signer = await getSigner();

  // Get contract for remote deployment
  const interchainTokenFactoryContract = await getContractInstance(
    interchainTokenFactoryContractAddress,
    interchainTokenFactoryContractABI,
    signer
  );

  // Estimate gas fees
  const gasAmount = await gasEstimator();

  // Initiate transaction
  const txn =
    await interchainTokenFactoryContract.deployRemoteCanonicalInterchainToken(
      "Avalanche",
      customTokenAddress, // Your token address
      "base-sepolia",
      gasAmount,
      { value: gasAmount }
    );

  console.log(`Transaction Hash: ${txn.hash}`);
}

async function main() {
  const functionName = process.env.FUNCTION_NAME;
  switch (functionName) {
    //...
    case "deployRemoteCanonicalInterchainToken":
      await deployRemoteCanonicalInterchainToken();
      break;
    default:
    //...
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
