<template>
  <section class="main-content section">
    <div class="container">
      <nuxt />
    </div>
  </section>
</template>

<style>
.container {
  max-width: 680px !important;
}
</style>
<script>
export default {
  mounted() {
    this.$provider.initProvider(window.ethereum)
  },
}
</script>
