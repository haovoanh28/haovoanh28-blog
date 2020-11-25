<template>
  <div class="post-detail">
    <template v-if="loading">
      <content-placeholders>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="6" />
      </content-placeholders>
    </template>
    <template v-else-if="post">
      <client-only>
        <div class="post-detail__title">
          <h1>{{ post.title }}</h1>
        </div>
        <div class="post-detail__cover">
          <img :src="post.coverImg" alt="cover" />
        </div>
        <div class="post-detail__content">
          <BaseText fontSize="1.8rem" v-html="post.content"></BaseText>
        </div>
      </client-only>
    </template>
    <h1 v-else>Post not found</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "post-details",
  data() {
    return {
      post: "",
    };
  },
  computed: {
    ...mapState("post/get", ["loading"]),
  },
  methods: {
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

<style lang="scss" scoped>
.post-detail {
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;

  & > * {
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
}

.post-detail__title {
  margin: 0 auto;
}

.post-detail__cover {
  height: 40rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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
  line-height: 1.4;
  font-size: 1.6rem;
}

img {
  width: 100%;
  object-fit: cover;
}
</style>