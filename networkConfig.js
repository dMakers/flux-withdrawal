const networkConfig = {
  netId1: {
    rpcCallRetryAttempt: 25,
    currencyName: 'ETH',
    explorerUrl: {
      tx: 'https://etherscan.io/tx/',
    },
    networkName: 'Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/',
    smartContractPollTime: 15,
    blockGasLimit: 7300000,
  },
  netId42: {
    rpcCallRetryAttempt: 15,
    currencyName: 'kETH',
    explorerUrl: {
      tx: 'https://kovan.etherscan.io/tx/',
    },
    networkName: 'Kovan',
    rpcUrl: 'https://kovan.infura.io/v3/',
    smartContractPollTime: 15,
    blockGasLimit: 9000000,
  },
}

export default networkConfig
