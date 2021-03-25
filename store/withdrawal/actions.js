/* eslint-disable no-console */
import ABI from '@/abi/AccessControlledAggregator.json'
import { GasPriceOracle } from 'gas-price-oracle'
import { toWei, toHex, numberToHex, toBN } from 'web3-utils'
import {
  SAVE_LIST,
  SAVE_NODE,
  SAVE_RECIPIENT,
  SAVE_TARGET,
  SAVE_TX,
  RESET_LIST,
  SAVE_TOTAL,
} from './constants'
const gasOracle = new GasPriceOracle()

export default {
  async processUserData(
    { state, commit, dispatch },
    { list, node, recipient }
  ) {
    commit(RESET_LIST)
    let parsedList = list.includes(',') ? list.split(',') : list.split('\n')
    parsedList = new Set(parsedList)
    commit(SAVE_LIST, { list: parsedList })
    commit(SAVE_NODE, { node })
    commit(SAVE_RECIPIENT, { recipient })

    for (const contract of parsedList) {
      const flux = this.$provider.getContract({
        abi: ABI,
        address: contract,
      })
      const payment = await flux.methods.withdrawablePayment(node).call()
      commit(SAVE_TOTAL, { total: state.total.add(toBN(payment)) })
      commit(SAVE_TARGET, { contract, payment })
    }
  },
  async withdraw({ state, commit, dispatch }, { targets }) {
    console.log('targets', targets)
    const netId = await this.$provider.config.id
    let fast
    if (Number(netId) === 1) {
      ;({ fast } = await gasOracle.gasPrices())
    } else {
      fast = 10
    }
    for (const { contract, payment } of targets) {
      console.log('contract', contract)
      const flux = this.$provider.getContract({
        abi: ABI,
        address: contract,
      })
      if (toBN(payment).isZero()) {
        throw new Error(`There are no LINK to withdraw. ${contract}`)
      }
      const gas = await flux.methods
        .withdrawPayment(state.node, this.$provider.address, payment)
        .estimateGas({ from: this.$provider.address })
      const data = await flux.methods
        .withdrawPayment(state.node, this.$provider.address, payment)
        .encodeABI()
      const callParams = {
        method: 'eth_sendTransaction',
        params: [
          {
            from: this.$provider.address,
            to: flux._address,
            gas: numberToHex(gas + 50000),
            gasPrice: toHex(toWei(fast.toString(), 'Gwei')),
            value: 0,
            data,
          },
        ],
      }
      const txHash = await this.$provider.sendRequest(callParams)
      commit(SAVE_TX, { tx: txHash })
      console.log(`https://etherscan.io/tx/${txHash}`)
    }
  },
}
