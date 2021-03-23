<template>
  <div class="post-comments__comment">
    <p class="comment-author">
      {{ comment.author }}
    </p>
    <p>{{ comment.text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      default: () => {
        return {
          author: "zaka",
          text: "Some comment of article",
          replies: [],
        };
      },
    },
  },
};
</script>

<style lang="scss">
.post-comments__comment {
  margin-bottom: 2rem;
}

.comment-author {
  color: $primary-color;
}
</style>