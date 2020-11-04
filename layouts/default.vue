<template>
  <nuxt />
</template>

<script>
export default {
  mounted() {
    this.$provider.initProvider(window.ethereum)
  },
}
</script>
