<template>
  <section class="main-content section">
    <div class="container">
      <nuxt />
      <footer class="mt-5 has-text-right section">
        <a
          href="https://github.com/dmakers/flux-withdrawal"
          target="_blank"
          class="button is-icon"
        >
          <GithubIcon />
        </a>
      </footer>
    </div>
  </section>
</template>

<style>
.container {
  max-width: 680px !important;
}
</style>
<script>
import { GithubIcon } from '@/components/icons'
export default {
  components: {
    GithubIcon,
  },
  mounted() {
    this.$provider.initProvider(window.ethereum)
  },
}
</script>
