import { fromWei } from 'web3-utils'

export default {
  totalLink: (state) => {
    return fromWei(state.total.toString())
  },
}
