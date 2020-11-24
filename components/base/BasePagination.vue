<template>
  <div class="todo__pages" v-if="currentPage !== 0">
    <div
      class="todo__pages-item"
      v-for="page in Number(totalPages)"
      :key="`page-${page}`"
      :class="{ 'todo__pages-item--active': page === currentPage }"
      @click="goToPage(page)"
    >
      <span>{{ page }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-pagination",
  props: {
    totalPages: Number,
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    goToPage(page) {
      if (page > this.totalPages) {
        return;
      }
      if (page === this.currentPage) {
        return;
      }
      this.$emit("go-to-page", page);
      this.$emit("setCurrentPage", page);
    },
  },
};
</script>

<style lang="scss">
.todo__pages {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo__pages-item {
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  cursor: pointer;

  &--active {
    color: white;
    background-color: $black;
  }
}
</style>