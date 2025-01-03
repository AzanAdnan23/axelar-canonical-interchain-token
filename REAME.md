## Setup Instructions

### 1. Clone the Repository

Clone the repository using the following link:

```bash
git clone https://github.com/AzanAdnan23/axelar-canonical-interchain-token.git
```

### 2. Create `.env` Files

Create two `.env` files:

- One in the `/multichain-contract-with-its` directory
- Another in the `/multichain-contract-with-its/token/` directory

### 3. Add Private Key

In both `.env` files, add your private key:

```
PRIVATE_KEY=XXXXXXXXXXXXXXXXXXXXXXX
```

### 4. Install Dependencies for the Main Project

Run the following command from the `/multichain-contract-with-its` directory:

```bash
npm install
```

### 5. Install Dependencies for the Token Contract

Run the following command from the `/multichain-contract-with-its/token/` directory:

```bash
npm install
```

### 6. Token Contract Deployment Details

We have already deployed the ERC20 token contract on both the Avalanche and Fantom testnets. Below are the details:

#### Avalanche Testnet:

- **Salt:** 0x2d5a55e7892972852bef954d86c3ff76a66d90019c48836dd329f9ad2ea268a1
- **Transaction Hash:** 0x8318ad88a28f1ef09d9f8b1a45d7908df9d50720bfa6eb89fed7a524b9a6f4f7
- **Token ID:** 0x2ce8622b285f279474c07e389e9c2a1bb90ba951e86bd9e25b14fd70161b0015
- **Expected Token Manager Address:** 0x4C263be55b0a7e4a46324a71200Abec4bdD46D9c

#### Fantom Testnet:

- **Transaction Hash:** 0x9a7ea178013cf81f6923682d38eb76675b5743ff5e2ac16f7bef1dba85c245aa
- **Token ID:** 0x2ce8622b285f279474c07e389e9c2a1bb90ba951e86bd9e25b14fd70161b0015
- **Expected Token Manager Address:** 0x4C263be55b0a7e4a46324a71200Abec4bdD46D9c

### 7. Test Scripts

Use the following commands to test different scenarios:

- **Deploy Token Manager and Add a Minter:**

  ```bash
  FUNCTION_NAME=deployTokenManagerAndAddAMinter npx hardhat run index.js --network avalanche
  ```

- **Mint and Approve:**

  ```bash
  FUNCTION_NAME=mintAndApproveITS npx hardhat run index.js --network avalanche
  ```

- **Deploy Token Manager Remotely:**

  ```bash
  FUNCTION_NAME=deployTokenManagerRemotely npx hardhat run index.js --network avalanche
  ```

- **Transfer Tokens:**
  ```bash
  FUNCTION_NAME=transferTokens npx hardhat run index.js --network avalanche
  ```

### 8. Transfer Tokens

To transfer tokens, execute the following command:

```bash
FUNCTION_NAME=transferTokens npx hardhat run index.js --network avalanche
```
