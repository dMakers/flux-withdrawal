import { toBN } from 'web3-utils'
export default () => ({
  contracts: [],
  node: '',
  recipient: '',
  targets: [],
  txs: [],
  total: toBN(0),
})
