<template>
  <div class="header2-wrapper" :class="{ visible: isMenu }" @click="toggleMenu">
    <div class="header2" :class="{ 'm-left-0': isMenu }">
      <div class="header2-head">
        <p>Hào Võ</p>
      </div>
      <nav class="header2-nav">
        <ul>
          <li>
            <nuxt-link to="/?page=1" replace
              ><font-awesome-icon :icon="['fas', 'home']" />
              {{ $t("sidebar.home") }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/about"
              ><font-awesome-icon :icon="['fas', 'user']" />
              {{ $t("sidebar.about") }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/contact"
              ><font-awesome-icon :icon="['fas', 'id-card']" />
              {{ $t("sidebar.contact") }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/project"
              ><font-awesome-icon :icon="['fas', 'globe-asia']" />
              {{ $t("sidebar.projects") }}</nuxt-link
            >
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("render", ["isMenu"]),
  },
  methods: {
    toggleMenu() {
      this.$store.commit("render/SET_CLOSE_MENU");
    },
  },
};
</script>

<style lang="scss" scoped>
.header2-wrapper {
  @include large_phone {
    min-width: 100%;
    min-height: 100vh;
    background-color: rgba(207, 200, 200, 0.7);
    position: fixed;
    top: 0;
    transition: all 0.3s;
    z-index: 5;
    opacity: 0;
    visibility: hidden;
  }
}

.header2 {
  background-color: $primary-color;
  width: 20%;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  transition: margin-left 0.3s;
  z-index: 5;
  margin-left: 0;
  margin-top: 6rem;
  opacity: 0;
  visibility: hidden;

  @include large_phone {
    min-height: 100vh;
    margin-left: -45%;
    width: 45%;
    opacity: 1;
    visibility: visible;
    border-right: 1px solid $white;
  }

  @include medium_phone {
    width: 55%;
    margin-left: -55%;
  }

  @include small_phone {
    width: 70%;
    margin-left: -70%;
  }
}

.header2-head {
  border-top: 1px solid $white;
  display: flex;
  padding: 1rem 0 3rem 0;
  text-align: center;
  justify-content: center;
  p {
    font-size: 3rem;
    text-transform: uppercase;
  }
}

.header2-nav {
  text-transform: capitalize;
  margin: 0 auto;
  ul:first-child {
    list-style-type: none;

    &:not(:last-child) {
      border-bottom: 1px solid white;
    }

    li {
      padding: 1rem 0;
      cursor: pointer;
      a {
        color: white;
        text-decoration: none;
        position: relative;
        padding: 1rem 0 1rem 1rem;
        display: block;
        height: 100%;
        width: 98%;
        background: linear-gradient(to right, $white 50%, $primary-color 50%);
        background-size: 201% 100%;
        background-position: right bottom;
        cursor: pointer;

        svg {
          margin-right: 1rem;
        }
      }
    }
  }

  ul:last-child {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    width: 95%;

    li {
      padding: 1rem 0 1rem 1rem;
      cursor: pointer;

      svg {
        font-size: 2.5rem;
      }
    }
  }
}

.nuxt-link-exact-active {
  background-position: left bottom !important;
  color: $black !important;
}
</style>