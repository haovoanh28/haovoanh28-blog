<template>
  <div class="sidebar">
    <div class="sidebar__search">
      <form>
        <input type="text" placeholder="Search posts" v-model="searchString" />
        <button class="loading-btn" v-if="loading">
          <font-awesome-icon :icon="['fas', 'spinner']" />
        </button>
        <button @click.prevent="handleSearch" v-else>
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </form>
      <div class="sidebar__menu" @click="toggleMenu">
        <!-- <font-awesome-icon :icon="['fas', 'bars']" /> -->
        <div :class="{ 'rotate-right': isMenu }"></div>
        <div :class="{ invisible: isMenu }"></div>
        <div :class="{ 'rotate-left': isMenu }"></div>
      </div>
    </div>
    <div
      class="sidebar__categories"
      :class="{ 'height-sidebar-responsive': isMenu }"
    >
      <BaseText capitalize fw800 textBig padding="1rem">{{
        $t("categories.title")
      }}</BaseText>
      <ul>
        <li v-for="c in categories" :key="`category-${c}`">
          <BaseText padding="1.2rem 1rem" fw600>{{ c.toLowerCase() }}</BaseText>
        </li>
      </ul>
    </div>
    <!-- <div class="sidebar__top-posts">
      <BaseText capitalize fw800 textMedium padding="1rem 0"
        >Lastest Posts</BaseText
      >
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isMenu: false,
      searchString: "",
    };
  },
  computed: {
    ...mapState("general", ["categories"]),
    ...mapState("post/search", ["loading"]),
    ...mapState("post/get", ["typesCount"]),
  },
  methods: {
    ...mapActions("post/search", ["searchPostAsync"]),
    toggleMenu() {
      if (this.isMenu) {
        this.isMenu = false;
      } else {
        this.isMenu = true;
      }
    },
    handleSearch() {
      const routeName = this.$route.name;
      if (routeName === "search") {
        this.$router.replace({
          path: "/search",
          query: {
            searchString: this.searchString,
          },
        });
        return;
      }

      this.$router.push({
        path: "/search",
        query: {
          searchString: this.searchString,
        },
      });
      // this.searchPostAsync(this.searchString);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 30%;

  &__categories,
  &__top-posts {
    margin-top: 2rem;
  }

  @include large_phone {
    width: 90%;
    align-self: center;
  }
}

.sidebar__search {
  form {
    width: 100%;
    border: 1px solid $primary-color;
    border-radius: 5rem;
    overflow: hidden;
    display: flex;
    background-color: white;
  }

  input {
    outline: none;
    border: none;
    width: 100%;
    padding: 1rem 1.5rem;
  }

  button {
    border: none;
    outline: none;
    background-color: white;
    margin-right: 1rem;
    cursor: pointer;
    svg {
      color: rgba(128, 128, 128, 0.5);
    }
  }

  @include large_phone {
    display: flex;
    align-items: center;
    justify-content: space-between;
    form {
      width: 85%;
    }
  }
}

.sidebar__menu {
  display: none;
  color: gray;
  border: 1px solid darken(gray, 10%);
  border-radius: 3px;
  cursor: pointer;
  width: 10%;

  & div {
    height: 2.8px;
    width: 20px;
    background-color: gray;
    transition: all 0.3s ease-in;
    border-radius: 3px;
  }

  & div:nth-child(2) {
    margin: 0.3rem 0;
  }

  @include large_phone {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    align-items: center;
  }
}

.sidebar__categories {
  background-color: lighten($white, 8%);
  border-radius: 4px;
  transition: all 0.3s linear;
  border: 1px solid $primary-color;

  ul {
    list-style-type: none;

    li:not(:last-child):nth-child(odd) {
      border-bottom: 1px solid gray;
    }

    li:not(:last-child):nth-child(even) {
      border-bottom: 1px solid lighten(gray, 30%);
    }
  }

  @include large_phone {
    height: 0;
    overflow: hidden;
    padding: 0;
  }
}

.fa-spinner {
  animation: spinner 1s linear infinite;
}
</style>