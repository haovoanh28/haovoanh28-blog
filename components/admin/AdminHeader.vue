<template>
  <div class="admin__header">
    <div @click="this.toggleMenu">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("render", ["isMenu"]),
  },
  methods: {
    toggleMenu() {
      if (this.isMenu) {
        this.$store.commit("render/SET_CLOSE_MENU");
      } else {
        this.$store.commit("render/SET_OPEN_MENU");
      }
    },
  },
};
</script>

<style lang="scss">
.admin__header {
  min-width: 100%;
  background-color: $black;
  padding: 1.5rem;
  color: $white;
  display: none;

  & > div {
    cursor: pointer;
  }

  @include tablet {
    display: flex;
  }
}
</style>