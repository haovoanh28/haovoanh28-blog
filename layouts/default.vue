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

<style lang="scss" scoped>
.container {
  padding-bottom: 3rem;
  min-height: 100vh;
}
</style>
