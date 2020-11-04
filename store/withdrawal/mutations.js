import { SAVE_LIST, SAVE_NODE, SAVE_RECIPIENT } from './constants'

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
}
