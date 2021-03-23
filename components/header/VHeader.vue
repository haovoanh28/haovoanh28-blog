<template>
  <header class="header">
    <nav class="header__nav">
      <ul>
        <li>
          <nuxt-link :to="{ path: '/', query: { page: 1 } }">{{
            $t("sidebar.home")
          }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">{{ $t("sidebar.about") }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contact">{{ $t("sidebar.contact") }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/project">{{ $t("sidebar.projects") }}</nuxt-link>
        </li>
      </ul>
      <ul>
        <li><font-awesome-icon :icon="['fab', 'facebook-square']" /></li>
        <li><font-awesome-icon :icon="['fab', 'github-square']" /></li>
        <li><font-awesome-icon :icon="['fab', 'youtube-square']" /></li>
        <li><font-awesome-icon :icon="['fab', 'twitter-square']" /></li>
        <li><font-awesome-icon :icon="['fas', 'envelope']" /></li>
      </ul>
    </nav>
    <nav class="header__nav header__nav--responsive">
      <ul>
        <li @click="toggleMenu">
          <div class="header__menu">
            <div :class="{ 'rotate-right': isMenu }"></div>
            <div :class="{ invisible: isMenu }"></div>
            <div :class="{ 'rotate-left': isMenu }"></div>
          </div>
        </li>
        <li>
          <p>Hao Vo</p>
        </li>
        <li></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("render", ["isMenu"]),
  },
  methods: {
    toggleMenu() {
      if (this.isMenu) {
        this.$store.commit("render/SET_CLOSE_MENU");
      } else {
        this.$store.commit("render/SET_OPEN_MENU");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 6rem;
  background-color: $primary-color;
  display: flex;
  @include flex_center;
  z-index: 100;
  font-size: 1.4rem;
}

.header__nav {
  height: 100%;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    height: 100%;
    display: flex;
    justify-content: space-between;
    width: 100%;
    color: $white;
    list-style-type: none;

    li {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;

      a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        color: $white;
        text-decoration: none;
        position: relative;

        &::after {
          content: "";
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: $white;
          transform: scaleX(0);
          transform-origin: 0% 50%;
          transition: all 0.3s;
        }
      }
    }

    &:nth-child(1) {
      justify-content: space-between;
    }

    &:nth-child(2) {
      justify-content: flex-end;

      li:not(:last-child) {
        margin-right: 2rem;
      }

      svg {
        font-size: 2.5rem;
      }
    }
  }

  @include large_phone {
    display: none;
  }
}

.nuxt-link-exact-active::after {
  /* border-bottom: 4px solid $white; */
  transform: scaleX(1) !important;
}

.header__nav--responsive {
  display: none;

  ul {
    li {
      flex: 1;

      &:nth-child(2) {
        display: flex;
        justify-content: center;
      }
    }
  }

  @include large_phone {
    display: block;
  }
}

.header__menu {
  & div {
    height: 2.8px;
    width: 20px;
    background-color: white;
    transition: all 0.3s ease-in;
    border-radius: 3px;
  }

  & div:nth-child(2) {
    margin: 0.3rem 0;
  }
}
</style>