<template>
  <div class="sidebar">
    <div class="sidebar__search">
      <form>
        <input type="text" placeholder="Search posts" />
        <button><font-awesome-icon :icon="['fas', 'search']" /></button>
      </form>
    </div>
    <div class="sidebar__categories">
      <BaseText capitalize fw800 textBig padding="1rem 0">{{
        $t("categories.title")
      }}</BaseText>
      <ul>
        <li v-for="c in categories" :key="`category-${c}`">
          <BaseText padding="1.2rem 0" fw600>{{
            $t(`categories.${c.toLowerCase()}`)
          }}</BaseText>
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
export default {
  data() {
    return {
      categories: [
        "Technology",
        "Life",
        "Security",
        "Algorithms",
        "Programming",
      ],
    };
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
    border: 1px solid gray;
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
}

.sidebar__categories {
  padding: 1rem;
  background-color: lighten($light-gray, 8%);
  border-radius: 4px;

  ul {
    list-style-type: none;

    li:not(:last-child):nth-child(odd) {
      border-bottom: 1px solid gray;
    }

    li:not(:last-child):nth-child(even) {
      border-bottom: 1px solid lighten(gray, 30%);
    }

    /* li:not(:last-child) {
      border-bottom: 1px solid lightgray;
    } */
  }
}

.sidebar__top-posts {
}
</style>