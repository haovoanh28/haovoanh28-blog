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
        <div class="post-detail__cover">
          <img :src="post.coverImg" alt="cover" />
        </div>
        <div>
          <div class="post-detail__content" v-html="post.content"></div>
        </div>
      </client-only>
    </template>
    <h1 v-else>Post not found</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import convertTime from "@/libs/helpers/convertTime";

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
  data() {
    return {
      post: "",
    };
  },
  computed: {
    ...mapState("post/get", ["loading"]),
  },
  methods: {
    convertTime,
    ...mapActions("post/get", ["getPostByIdAsync"]),
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
.post-detail {
  width: 60%;
  margin: 0 auto;
  padding: 0.5rem 0 2rem 0;

  & > *:not(:first-child) {
    margin-top: 3rem;
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
    letter-spacing: 0.7px !important;
    margin-top: 1rem;
  }
}

img {
  width: 100%;
  object-fit: cover;
}
</style>