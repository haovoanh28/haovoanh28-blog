<template>
  <div class="admin__post">
    <div class="admin__post-body">
      <div class="admin__add-post">
        <BaseButton uppercase @click.native="handleForward">{{
          $t("post.create")
        }}</BaseButton>
      </div>
      <template v-if="loading">
        <content-placeholders v-for="n in limit" :key="`${n}-post-placeholder`">
          <content-placeholders-heading />
        </content-placeholders>
      </template>
      <template v-else-if="paginatedPosts.length > 0">
        <AdminPostItem
          v-for="post in paginatedPosts"
          :key="`admin-${post._id}`"
          :post="post"
          :loadingId="loadingId"
          @delete-post="handleDeletePost"
        ></AdminPostItem>
      </template>
      <template v-else>
        <h1>{{ $t("generalMessage.noPost") }}</h1>
      </template>
    </div>
    <BasePagination
      :totalPages="totalPages"
      :currentPage="currentPage"
      @go-to-page="handleGoToPage"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      limit: 10,
    };
  },
  async fetch() {
    await this.getPostByPageAsync({
      page: this.currentPage,
      limit: this.limit,
    });
  },
  computed: {
    ...mapState("post/get", [
      "posts",
      "loading",
      "loadingId",
      "paginatedPosts",
      "totalPages",
    ]),
  },
  methods: {
    ...mapActions("post/get", ["getPostsAsync", "getPostByPageAsync"]),
    ...mapActions("post/delete", ["deletePostByIdAsync"]),
    handleForward() {
      this.$router.push({ path: "/admin/post/create" });
    },
    handleDeletePost(id) {
      this.deletePostByIdAsync(id);
    },
    handleGoToPage(page) {
      this.currentPage = page;
      this.getPostByPageAsync({
        page: this.currentPage,
        limit: 10,
      });
      this.$router.push({ path: `/admin/post/?page=${page}` });
    },
  },
  created() {
    const { page } = this.$route.query;
    if (!page || page > this.totalPages) {
      this.$router.push({ path: "/admin/post/?page=1" });
    } else {
      this.currentPage = Number(page);
      this.$router.push({ path: `/admin/post/?page=${page}` });
    }
  },
};
</script>

<style lang="scss" scoped>
.admin__post {
  width: 80%;
  margin: 2rem auto 0 auto;
}

.admin__add-post {
  margin-bottom: 2rem;
}

.admin__post-body {
  width: 100%;
  margin: 0 auto;
}

.vue-content-placeholders {
  margin-bottom: 3rem;
}
</style>