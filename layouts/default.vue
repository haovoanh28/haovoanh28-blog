<template>
  <div class="body">
    <client-only>
      <notifications />
    </client-only>
    <VHeader />
    <VHeader2 />
    <div class="container">
      <Nuxt />
    </div>
    <VFooter />
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "canonical",
          href: "https://haovoanh28.herokuapp.com" + this.$route.path,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 3rem;
  min-height: 100vh;
}
</style>
