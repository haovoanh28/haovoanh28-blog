<template>
  <div
    class="admin__sidebar-wrapper"
    @click="toggleMenu"
    :class="{ visible: isMenu }"
  >
    <div class="admin__sidebar" :class="{ 'm-left-0': isMenu }">
      <div class="admin__sidebar-head">
        <!-- <font-awesome-icon :icon="['fas', 'user-cog']" />
        <p>admin</p> -->
        <div>
          <img :src="user.imgUrl" alt="user" v-if="user.imgUrl" />
        </div>
      </div>
      <nav class="admin__sidebar-nav">
        <ul>
          <li>
            <nuxt-link to="/admin/dashboard"
              ><font-awesome-icon :icon="['fas', 'globe-asia']" />
              <span>
                {{ $t("adminSidebar.overview") }}
              </span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/post?page=1"
              ><font-awesome-icon :icon="['fas', 'pager']" />
              <span>
                {{ $t("adminSidebar.post") }}
              </span>
            </nuxt-link>
          </li>
        </ul>
        <ul>
          <li>
            <a href="/?page=1"
              ><font-awesome-icon :icon="['fas', 'home']" />
              <span>
                {{ $t("adminSidebar.home") }}
              </span>
            </a>
          </li>
          <li>
            <nuxt-link to="/admin/register"
              ><font-awesome-icon :icon="['fas', 'user-plus']" />
              <span>
                {{ $t("adminSidebar.register") }}
              </span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/admin/profile"
              ><font-awesome-icon :icon="['fas', 'user']" />
              <span>
                {{ $t("adminSidebar.editProfile") }}
              </span>
            </nuxt-link>
          </li>
          <li>
            <a @click="logoutAsync"
              ><font-awesome-icon :icon="['fas', 'sign-out-alt']" />
              <span>
                {{ $t("adminSidebar.signOut") }}
              </span></a
            >
          </li>
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
    ...mapState("auth", ["user"]),
  },
  methods: {
    ...mapActions("account/logout", ["logoutAsync"]),
    toggleMenu() {
      this.$store.commit("render/SET_CLOSE_MENU");
    },
  },
  handleLogout() {
    this.logoutAsync();
  },
};
</script>

<style lang="scss" scoped>
.admin__sidebar-wrapper {
  @include tablet {
    min-width: 100%;
    min-height: 100vh;
    background-color: rgba(207, 200, 200, 0.7);
    position: fixed;
    top: 0;
    transition: all 0.3s ease-out;
    z-index: 5;
    opacity: 0;
    visibility: hidden;
  }
}

.admin__sidebar {
  min-height: 100vh;
  background-color: $primary-color;
  width: 20%;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  transition: margin-left 0.3s;
  z-index: 5;
  border-right: 1px solid $white;

  @include tablet {
    margin-left: -25%;
    border-right: 1px solid $white;
    width: 30%;
  }

  @include medium_phone {
    width: 40%;
  }

  @include small_phone {
    width: 55%;
  }
}

.admin__sidebar-head {
  display: flex;
  padding: 1rem 0 3rem 0;
  text-align: center;
  justify-content: center;

  & > div {
    height: 8rem;
    width: 8rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
}

.admin__sidebar-nav {
  text-transform: capitalize;
  margin: 0 auto;
  ul {
    list-style-type: none;

    &:not(:last-child) {
      border-bottom: 1px solid white;
    }

    li {
      padding: 1rem 0;
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
        transition: all 0.3s;
        cursor: pointer;

        svg {
          margin-right: 1rem;
          width: 10%;
        }
      }
    }
  }
}

.nuxt-link-exact-active {
  background-position: left bottom !important;
  color: $black !important;
}
</style>