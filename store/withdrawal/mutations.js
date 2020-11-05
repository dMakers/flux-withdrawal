import {
  SAVE_LIST,
  SAVE_NODE,
  SAVE_RECIPIENT,
  SAVE_TARGET,
  SAVE_TX,
  RESET_LIST,
} from './constants'

export default {
  [SAVE_LIST](state, { list }) {
    state.contracts = list
  },
  [SAVE_NODE](state, { node }) {
    state.node = node
  },
  [SAVE_RECIPIENT](state, { recipient }) {
    state.recipient = recipient
  },
  [SAVE_TX](state, { tx }) {
    state.txs.push(tx)
  },
  [SAVE_TARGET](state, { contract, payment }) {
    state.targets.push({ contract, payment })
  },
  [RESET_LIST](state) {
    state.contracts = []
    state.targets = []
  },
}
