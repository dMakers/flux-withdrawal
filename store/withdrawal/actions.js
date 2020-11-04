/* eslint-disable no-console */
import ABI from '@/abi/AccessControlledAggregator.json'
import { GasPriceOracle } from 'gas-price-oracle'
import { toWei, toHex } from 'web3-utils'
import { SAVE_LIST, SAVE_NODE, SAVE_RECIPIENT } from './constants'
const gasOracle = new GasPriceOracle()

export default {
  processUserData({ commit, dispatch }, { list, node, recipient }) {
    const parsedList = list.includes(',') ? list.split(',') : list.split('\n')
    commit(SAVE_LIST, { list: parsedList })
    commit(SAVE_NODE, { node })
    commit(SAVE_RECIPIENT, { recipient })
  },
  async withdraw({ state, commit, dispatch }) {
    const { fast } = await gasOracle.gasPrices()
    for (const contract of state.contracts) {
      const flux = this.$provider.getContract({
        abi: ABI,
        address: contract,
      })
      const payment = await flux.methods.withdrawablePayment(state.node).call()
      console.log('payment', contract, payment)
      const gas = await flux.methods
        .withdrawPayment(state.node, this.$provider.address, payment)
        .estimateGas({ from: this.$provider.address })
      // todo dont wait. just get the hash
      const tx = await flux.methods
        .withdrawPayment(state.node, state.recipient, payment)
        .send({
          from: this.$provider.address,
          gasPrice: toHex(toWei(fast.toString(), 'Gwei')),
          gas: gas + 50000,
        })
      console.log('tx', tx)
    }
  },
}
