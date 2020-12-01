<template>
  <div class="blog-preview" @click="handleForward(post._id)">
    <div class="blog-preview__cover">
      <img :src="post.coverImg" />
    </div>
    <div class="blog-preview__time">
      <p>{{ convertTime(post.createdAt) }}</p>
      <p>admin</p>
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
import convertTime from "@/libs/helpers/convertTime";

export default {
  props: {
    post: Object,
  },
  computed: {
    time() {
      const createdAt = new Date(this.post.createdAt);
      const convertedTime = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`;

      return convertedTime;
    },
  },
  methods: {
    handleText,
    convertTime,
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
  border-radius: 4px;
  overflow: hidden;
  padding-bottom: 1.5rem;
  transition: all 0.3s;

  &:hover,
  &:active {
    transform: translateY(-8px);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
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

.blog-preview__time {
  display: flex;
  justify-content: space-between;
  color: gray;
  padding: 1rem 1.5rem;
}

.blog-preview__title {
  padding: 0 1.5rem 1rem 1.5rem;
}

.blog-preview__content {
  padding: 0 1.5rem;
  & img {
    display: none;
  }
}
</style>