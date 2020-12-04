<template>
  <section class="section">
    <h1 class="title is-4">
      Flux-withdrawal. The tool to withdraw payment from multiple Flux Agregator
      smart contracts.
    </h1>
    <b-field class="mb-5" label="Node address">
      <b-input v-model="node"></b-input>
    </b-field>
    <b-field label="Contracts list">
      <b-input v-model="list" type="textarea"></b-input>
    </b-field>
    <b-field>
      <b-button type="is-info" @click="onProcess">Process</b-button>
    </b-field>
    <b-field v-for="target in targets" :key="target.contract">
      <b-checkbox v-model="selectedContracts" :native-value="target">
        {{ target.contract }} - {{ renderPayment(target.payment) }}
      </b-checkbox>
    </b-field>
    <b-field grouped>
      <b-field label="Total avaliable">
        {{ totalLink }}
      </b-field>
      <b-field label="Total withdrawal">
        {{ totalWithdrawal }}
      </b-field>
    </b-field>
    <b-field class="mt-5" label="Recipient">
      <b-input v-model="recipient"></b-input>
    </b-field>
    <b-field>
      <b-button type="is-primary" @click="onWithdraw">Withdraw</b-button>
    </b-field>
    <b-field v-for="tx in txs" :key="tx">
      <a :href="renderTx(tx)" target="_blank">{{ tx }}</a>
    </b-field>
  </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { fromWei, toBN } from 'web3-utils'
export default {
  name: 'HomePage',
  data() {
    return {
      node: '',
      list: '',
      recipient: '',
      selectedContracts: [],
    }
  },
  computed: {
    ...mapState('withdrawal', ['targets', 'txs']),
    ...mapGetters('withdrawal', ['totalLink']),
    totalWithdrawal() {
      return fromWei(
        this.selectedContracts
          .reduce((acc, { payment }) => {
            acc = acc.add(toBN(payment))
            return acc
          }, toBN(0))
          .toString()
      )
    },
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
