<template>
  <div class="search">
    <div class="search__body">
      <VSidebar />
      <div class="search__body-placeholder" v-if="loading">
        <content-placeholders v-for="n in 6" :key="`${n}-placeholder`">
          <content-placeholders-img />
          <content-placeholders-heading />
          <content-placeholders-text :lines="2" />
        </content-placeholders>
      </div>
      <div class="search__body-content" v-else>
        <template v-if="searchedPosts.length > 0">
          <PostPreviewItem
            v-for="p in searchedPosts"
            :key="`post-${p._id}`"
            :post="p"
          />
        </template>
        <template v-else>
          <h1>{{ $t("generalMessage.noPost") }}</h1>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("post/search", ["loading", "searchedPosts"]),
  },
  methods: {
    ...mapActions("post/search", ["searchPostAsync"]),
  },
  watch: {
    $route(to, from) {
      const { searchString } = this.$route.query;
      this.searchPostAsync(searchString);
    },
  },
  mounted() {
    const { searchString } = this.$route.query;
    this.searchPostAsync(searchString);
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  @include flex_center;
}

.search__body {
  padding: 3rem 0;
  width: 90%;
  display: flex;
  justify-content: space-between;

  @include large_phone {
    flex-direction: column;
    flex-wrap: wrap;
  }

  @include small_phone {
    width: 96%;
  }
}

.search__body-content,
.search__body-placeholder {
  width: 65%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @include tablet {
    flex-direction: column;
    align-items: center;
  }

  @include large_phone {
    width: 90%;
    margin-top: 2rem;
    align-self: center;
  }
}

.search__body-placeholder {
  .vue-content-placeholders {
    width: 47%;
    margin-bottom: 3rem;

    &-img {
      background-color: white;
    }

    @include tablet {
      width: 100%;
      margin-bottom: 2.5rem;
    }
  }
}
</style>