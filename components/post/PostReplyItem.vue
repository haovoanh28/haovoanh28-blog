<template>
  <div class="replies__reply">
    <span class="reply__author">Anonymous replied: </span>
    <p>{{ reply }}</p>
  </div>
</template>

<script>
export default {
  props: {
    reply: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.replies__reply {
  padding: 1.5rem;
}

.reply__author {
  color: $primary-color;
}
</style>