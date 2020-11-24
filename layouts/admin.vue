<template>
  <div class="admin">
    <client-only>
      <notifications />
    </client-only>
    <VAdminHeader />
    <VAdminSidebar />
    <div class="admin__body">
      <Nuxt />
    </div>
    <VFooter />
  </div>
</template>

<script>
export default {
  middleware: "auth",
};
</script>

<style lang="scss" scoped>
.admin {
  @include tablet {
    display: block;
  }
}

.admin__body {
  width: 80%;
  margin-left: 20%;
  padding-bottom: 3rem;
  min-height: 100vh;

  @include tablet {
    margin: 0 auto;
    width: 90%;

    & > * {
      width: auto !important;
    }
  }

  @include small_phone {
    width: 95%;
  }
}

footer {
  width: 80%;
  margin-left: 20%;

  @include tablet {
    width: 100%;
    margin-left: 0;
  }
}
</style>