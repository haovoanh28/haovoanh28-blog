<template>
  <div class="home">
    <div class="home__name-wrapper">
      <p class="home__name"></p>
    </div>
    <div class="home__body-wrapper">
      <div class="home__body">
        <VSidebar />
        <div class="home__body-placeholder" v-if="loading">
          <content-placeholders v-for="n in limit" :key="`${n}-placeholder`">
            <content-placeholders-img />
            <content-placeholders-heading />
            <content-placeholders-text :lines="2" />
          </content-placeholders>
        </div>
        <div class="home__body-content" v-else>
          <template v-if="paginatedPosts.length > 0">
            <PostPreviewItem
              v-for="p in paginatedPosts"
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
    <div class="home_pagination">
      <BasePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @go-to-page="handleGoToPage"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import scrollToBody from "@/libs/helpers/scrollToBody";
import typeWriter from "@/libs/helpers/typeWriter";

export default {
  head() {
    return {
      link: [
        {
          rel: "canonical",
          href: "https://haovoanh28.herokuapp.com/?page=" + this.currentPage,
        },
      ],
    };
  },
  data() {
    return {
      currentPage: 1,
      limit: 6,
    };
  },
  computed: {
    ...mapState("post/get", [
      "paginatedPosts",
      "totalPages",
      "notFound",
      "loading",
      "typesCount",
    ]),
  },
  methods: {
    ...mapActions("post/get", ["getPostsAsync", "getPostByPageAsync"]),
    handleGoToPage(page) {
      this.currentPage = page;
      this.getPostByPageAsync({
        page: this.currentPage,
        limit: this.limit,
      });
      this.$router.push({ path: `/?page=${this.currentPage}` });
      scrollToBody();
    },
  },
  watch: {
    $route() {
      const { page } = this.$route.query;
      this.currentPage = Number(page);
      if (page == 1) {
        this.$router.push({ path: "/?page=1" });
        this.getPostByPageAsync({
          page: 1,
          limit: this.limit,
        });
      }
    },
  },
  async fetch() {
    const { page } = this.$route.query;

    if (page) {
      this.currentPage = Number(page);
      await this.getPostByPageAsync({
        page: page,
        limit: this.limit,
      });
      return;
    } else {
      this.$router.push({ path: "/?page=1" });
      await this.getPostByPageAsync({
        page: 1,
        limit: this.limit,
      });
    }
  },
  async mounted() {
    // const text = "Hào Võ";
    const text = "Fix the cause, not the symptom";
    let i = 0;

    const home__name = document.getElementsByClassName("home__name")[0];

    typeWriter(text, home__name);

    const { page } = this.$route.query;

    if (page > this.totalPages) {
      this.currentPage = 1;
      await this.$router.push({ path: "/?page=1" });
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap");
.home__name-wrapper {
  width: 100%;
  min-height: 25rem;
  background-color: $white;
  padding: 1rem 2rem 2.5rem 2rem;
  /* border-bottom: 0.5px solid $primary-color; */
  p {
    font-family: "Nothing You Could Do", cursive;
    font-size: 10rem;
    text-align: center;
  }

  @include large_phone {
    display: none;
  }
}

.home__body-wrapper {
  display: flex;
  @include flex_center;
}

.home__body {
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

.home__body-content,
.home__body-placeholder {
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
.home__body-placeholder {
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
