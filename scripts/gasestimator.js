const {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} = require("@axelar-network/axelarjs-sdk");

const api = new AxelarQueryAPI({ environment: Environment.TESTNET });

async function gasEstimator() {
  const gas = await api.estimateGasFee(
    EvmChain.AVALANCHE,
    EvmChain.BASE_SEPOLIA,
    700000,
    1.1,
    GasToken.AVAX
  );

  console.log(gas);
  return gas;
}

gasEstimator();
