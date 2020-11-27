<template>
  <div class="blog-preview" @click="handleForward(post._id)">
    <div class="blog-preview__cover">
      <img :src="post.coverImg" />
    </div>
    <div class="blog-preview__title">
      <BaseText fw600>
        {{ handleText(post.title, 10) }}
      </BaseText>
    </div>
    <client-only>
      <div class="blog-preview__content">
        <!-- <BaseText v-html="handleText(post.content, 15)"> </BaseText> -->
        <p v-html="handleText(post.introduction, 15)"></p>
      </div>
    </client-only>
  </div>
</template>

<script>
import handleText from "@/libs/helpers/handleText";

export default {
  props: {
    post: Object,
  },  
  methods: {
    handleText,
    handleForward(id) {
      this.$router.push({
        path: `/post/${id}`,
      });
    },
  },
};
</script>

<style lang="scss">
.blog-preview {
  width: 47%;
  margin-bottom: 5rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  background-color: white;
  cursor: pointer;
  p {
    padding: 1rem 1.5rem !important;
  }

  @include tablet {
    width: 100%;
    margin-bottom: 2.5rem;
  }
}

.blog-preview__cover {
  width: 100%;
  height: 15rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.blog-preview__content {
  & img {
    display: none;
  }
}
</style>