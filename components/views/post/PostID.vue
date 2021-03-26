<template>
  <div class="post-detail">
    <template v-if="loading">
      <content-placeholders>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-heading />
        <content-placeholders-text :lines="16" />
        <content-placeholders-heading />
        <content-placeholders-text :lines="16" />
      </content-placeholders>
    </template>
    <template v-else-if="post">
      <client-only>
        <div class="post-detail__time">
          {{ convertTime(post.createdAt) }}
        </div>
        <div class="post-detail__title">
          <h1>{{ post.title }}</h1>
        </div>
        <div class="post-detail__introduction">
          <p>{{ post.introduction }}</p>
        </div>
        <div class="post-detail__cover">
          <img :src="post.coverImg" alt="cover" />
        </div>
        <div>
          <div class="post-detail__content" v-html="post.content"></div>
        </div>
        <div class="post-comments">
          <h2>Comments</h2>
          <form class="comments__form" @submit.prevent="handleAddComment">
            <base-input
              w50
              border
              :icon="['fas', 'user']"
              placeholder="Leave your name here"
              v-model="$v.userName.$model"
            />
            <div class="err-group" v-if="$v.userName.$error">
              <BaseText errText v-if="!$v.userName.required">{{
                "You have to leave your name to comment"
              }}</BaseText>
            </div>
            <base-text-area
              border
              placeholder="Leave your comment here"
              v-model="$v.userComment.$model"
            />
            <div class="err-group" v-if="$v.userComment.$error">
              <BaseText errText v-if="!$v.userComment.required">{{
                "You can't comment empty string"
              }}</BaseText>
            </div>
            <div class="comment-form__buttons">
              <base-button :loading="isCommenting">Comment</base-button>
            </div>
          </form>

          <post-comment-item
            v-for="(comment, index) in post.comments"
            :key="`comment-${post._id}-${index}`"
            :comment="comment"
            @new-post="handleNewPost"
          />
        </div>
      </client-only>
    </template>
    <template v-else>
      <h1>Post not found</h1>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
import convertTime from "@/libs/helpers/convertTime";
import PostCommentItem from "~/components/post/PostCommentItem.vue";
import BaseTextArea from "~/components/base/BaseTextArea.vue";

// Use to add syntax hightlight to code sample
import * as prism from "@/libs/js/prism";

export default {
  name: "post-details",
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.introduction,
        },
      ],
    };
  },
  components: {
    PostCommentItem,
    BaseTextArea,
  },
  data() {
    return {
      post: "",
      userName: "",
      userComment: "",
    };
  },
  validations: {
    userName: {
      required,
    },
    userComment: {
      required,
    },
  },
  computed: {
    ...mapState("post/get", ["loading"]),
    ...mapState("post/comment", ["isCommenting"]),
  },
  methods: {
    convertTime,
    ...mapActions("post/get", ["getPostByIdAsync"]),
    ...mapActions("post/comment", ["addCommentAsync"]),

    clearForm() {
      this.userComment = "";
      this.userName = "";
      this.$v.$reset();
    },

    async handleAddComment() {
      this.$v.$touch();

      if (this.$v.$invalid || this.$v.$error) {
        setTimeout(() => {
          this.$v.$reset();
        }, 3000);
        return;
      }

      let currentDate = convertTime(new Date());
      const commentObj = {
        author: this.userName,
        text: this.userComment,
        created: currentDate,
        replies: [],
      };
      const newPost = await this.addCommentAsync({
        comment: commentObj,
        postId: this.post._id,
      });

      this.post = newPost;
      this.clearForm();
    },

    handleNewPost(newPost) {
      this.post = newPost;
    },
  },
  async fetch() {
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    const id = this.$route.params.id;
    if (!checkForHexRegExp.test(id)) {
      return;
    }
    const post = await this.getPostByIdAsync(id);
    this.post = post;
  },
};
</script>

<style lang="scss">
@import "@/libs/styles/css/prism.css";

.post-detail {
  width: 60%;
  margin: 0 auto;
  padding: 0.5rem 0 2rem 0;
  text-align: justify;

  & > *:not(:first-child) {
    margin-top: 1.5rem;
  }

  .vue-content-placeholders {
    &-img {
      background-color: white;
      height: 40rem;
    }

    @include tablet {
      width: 100%;
      margin-bottom: 2.5rem;
    }
  }

  @include large_phone {
    width: 70%;
  }

  @include medium_phone {
    width: 80%;
  }

  @include small_phone {
    width: 90%;
  }
}

.post-detail__time {
  color: gray;
  text-align: right;
  padding-top: 1.5rem;
}

.post-detail__title {
  margin: 0 auto;
}

.post-detail__introduction {
  line-height: 1.5 !important;
  font-size: 1.6rem !important;
}

.post-detail__cover {
  height: 40rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include medium_phone {
    img {
      object-fit: cover;
    }
  }

  @include small_phone {
    height: 20rem;
  }
}

.post-detail__content {
  h1 {
    margin-top: 1.5rem;
  }

  p {
    line-height: 1.5 !important;
    font-size: 1.6rem !important;
    letter-spacing: 0.3px !important;
    margin-top: 1rem;
  }
}

img {
  width: 100%;
  object-fit: cover;
}

.post-comments {
  margin-top: 3rem;

  h2 {
    margin-bottom: 1rem;
  }
}

.comments__form {
  margin-bottom: 3rem;

  @include large_phone {
    .input {
      width: 100% !important;
    }
  }
}

.comment-form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>