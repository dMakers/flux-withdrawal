<template>
  <section class="section">
    <h1>
      Flux-withdrawal. The tool to withdraw payment from multiple Flux Agregator
      smart contracts.
    </h1>
    <b-field label="Node address">
      <b-input v-model="node"></b-input>
    </b-field>
    <b-field label="Contracts list">
      <b-input v-model="list" maxlength="2000" type="textarea"></b-input>
    </b-field>
    <b-field>
      <b-button @click="onProcess">Process</b-button>
    </b-field>
    <b-field v-for="target in targets" :key="target.contract">
      <b-checkbox v-model="selectedContracts" :native-value="target">
        {{ target.contract }} - {{ renderPayment(target.payment) }}
      </b-checkbox>
    </b-field>
    <b-field label="Recipient">
      <b-input v-model="recipient"></b-input>
    </b-field>
    <b-field>
      <b-button @click="onWithdraw">Withdraw</b-button>
    </b-field>
    <b-field v-for="tx in txs" :key="tx">
      <a :href="renderTx(tx)" target="_blank">{{ tx }}</a>
    </b-field>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { fromWei } from 'web3-utils'
export default {
  name: 'HomePage',
  data() {
    return {
      node: '0xeE4eD7389A1C565CE7Ba4586D86D049780d2fE5d',
      list: '',
      recipient: '',
      selectedContracts: [],
    }
  },
  computed: {
    ...mapState('withdrawal', ['targets', 'txs']),
  },
  mounted() {
    setTimeout(() => {
      this.recipient = this.$provider.address
    }, 1000)
  },
  methods: {
    ...mapActions('withdrawal', ['withdraw', 'processUserData']),
    onProcess() {
      this.processUserData({
        list: this.list,
        node: this.node,
        recipient: this.recipient,
      })
    },
    onWithdraw() {
      this.withdraw({ targets: this.selectedContracts })
    },
    renderPayment(payment) {
      return fromWei(payment)
    },
    renderTx(tx) {
      return `https://etherscan.io/tx/${tx}`
    },
  },
}
</script>
