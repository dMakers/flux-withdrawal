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
    <b-field label="Recipient">
      <b-input v-model="recipient"></b-input>
    </b-field>
    <b-field>
      <b-button @click="onProcess">Withdraw</b-button>
    </b-field>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'HomePage',
  data() {
    return {
      node: '0xeE4eD7389A1C565CE7Ba4586D86D049780d2fE5d',
      list: '',
      recipient: '',
    }
  },
  mounted() {
    this.recipient = this.$provider.address
  },
  methods: {
    ...mapActions('withdrawal', ['withdraw', 'processUserData']),
    onProcess() {
      this.processUserData({
        list: this.list,
        node: this.node,
        recipient: this.recipient,
      })
      this.withdraw()
    },
  },
}
</script>
