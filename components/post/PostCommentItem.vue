<template>
  <div class="post-comments__comment">
    <p class="comment-author">
      {{ comment.author }} said on
      <span class="comment--time">
        {{ convertTime(comment.created) }}
      </span>
    </p>
    <p>{{ comment.text }}</p>
    <div class="reply--link">
      <span @click.self="activeReply = true">Reply</span>
    </div>
    <div class="replies">
      <post-reply-item
        v-for="(reply, index) in comment.replies"
        :key="`reply-${index}-${Date.now()}`"
        :reply="reply"
      />
    </div>
    <div class="reply-input" v-if="activeReply">
      <BaseTextArea
        placeholder="Leave your reply here"
        v-model="$v.replyText.$model"
      />
      <BaseButton @click.native="handleReply" :loading="isReplying"
        >Reply</BaseButton
      >
    </div>
  </div>
</template>

<script>
import convertTime from "@/libs/helpers/convertTime";

import PostReplyItem from "@/components/post/PostReplyItem";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  components: {
    PostReplyItem,
  },
  props: {
    comment: {
      type: Object,
    },
  },
  data() {
    return {
      isReplying: false,
      activeReply: false,
      replyText: "",
    };
  },
  methods: {
    convertTime,
    ...mapActions("post/comment", ["addReplyToCommentAsync"]),
    async handleReply() {
      try {
        const { id: postId } = this.$route.params;
        const { _id: commentId } = this.comment;
        this.isReplying = true;
        const newPost = await this.addReplyToCommentAsync({
          commentId,
          postId,
          replyText: this.replyText,
        });
        this.replyText = "";
        this.activeReply = false;
        this.$emit("new-post", newPost);
      } catch (err) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: "Something wrong happened",
        });
      } finally {
        this.isReplying = false;
      }
    },
  },
  validations: {
    replyText: {
      required,
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

.comment--time {
  color: darken($primary-color, $amount: 30);
}

.reply--link {
  font-size: 1.1rem;
  margin-top: 0.5rem;
  span {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
}

.replies {
  margin-left: 2rem;
}

.reply-input {
  margin-left: 3rem;
  margin-top: 1.5rem;
  font-size: 1.1rem;

  textarea {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
}
</style>