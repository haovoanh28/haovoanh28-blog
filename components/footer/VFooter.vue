<template>
  <footer @click="isDisplay = false">
    <div class="footer" @click.self="isDisplay = false">
      <div class="footer__main">
        <div class="footer__logo">
          <img src="~/static/LogoMakr-6bFeEe.png" alt="logo" />
        </div>
        <div class="footer__links">
          <BaseText fw600 uppercase textMedium>{{
            $t("generalMessage.usefullLinks")
          }}</BaseText>
          <ul>
            <li>
              <a href="/">{{ $t("sidebar.home") }}</a>
            </li>
            <li>
              <a href="/about">{{ $t("sidebar.about") }}</a>
            </li>
            <li>
              <a href="/contact">{{ $t("sidebar.contact") }}</a>
            </li>
            <li>
              <a href="/project">{{ $t("sidebar.projects") }}</a>
            </li>
          </ul>
        </div>
        <div class="footer__categories">
          <BaseText fw600 uppercase textMedium>{{
            $t("categories.title")
          }}</BaseText>
          <ul>
            <li v-for="c in categories" :key="`footer__category-${c}`">
              <a>
                {{ $t(`categories.${c.toLowerCase()}`) }}
              </a>
            </li>
          </ul>
        </div>

        <div class="footer__locale">
          <div @click.stop="toggleList">
            <div class="flag" :class="flagClass" v-if="flagClass"></div>
            <div class="flag" v-else>
              <font-awesome-icon
                :icon="['fas', 'globe-asia']"
                :style="{ marginRight: '1rem' }"
              />
            </div>

            <span v-if="lang"> {{ lang }}</span>
            <span v-else> Select Language </span>
          </div>
          <ul :class="{ visible: isDisplay }">
            <li
              v-for="locale in locales"
              :key="`locale-${locale.locale}`"
              @click="handleChangeLocale(locale.locale)"
            >
              <div class="flag" :class="locale.class"></div>
              <span>{{ locale.title }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__icons">
        <ul>
          <li><font-awesome-icon :icon="['fab', 'facebook-square']" /></li>
          <li><font-awesome-icon :icon="['fab', 'github-square']" /></li>
          <li><font-awesome-icon :icon="['fab', 'youtube-square']" /></li>
          <li><font-awesome-icon :icon="['fab', 'twitter-square']" /></li>
          <li><font-awesome-icon :icon="['fas', 'envelope']" /></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      locales: [
        {
          class: "flag-vn",
          title: "Vietnamese",
          locale: "vi",
        },
        {
          class: "flag-us",
          title: "English",
          locale: "en",
        },
      ],
      categories: [
        "Technology",
        "Life",
        "Security",
        "Algorithms",
        "Programming",
      ],
      lang: "",
      flagClass: "",
      isDisplay: false,
      selectedLang: "Select language",
    };
  },
  methods: {
    ...mapActions("auth", ["updateLocaleAsync"]),
    handleChangeLocale(locale) {
      this.updateLocaleAsync(locale);
      this.isDisplay = false;

      if (locale === "vi") {
        this.lang = "Vietnamese";
        this.flagClass = "flag-vn";
        return;
      }

      if (locale === "en") {
        this.lang = "English";
        this.flagClass = "flag-us";
        return;
      }
    },
    changeSelected(e) {},
    toggleList() {
      if (!this.isDisplay) {
        this.isDisplay = true;
      } else {
        this.isDisplay = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  background-color: $black;
  color: $white;
}

.footer {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
}

.footer__main {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  padding: 1rem 0;

  @include large_phone {
    flex-direction: column;

    & > * {
      margin-bottom: 2rem;
    }
  }
}

.footer__logo {
  width: 20%;
  height: 5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @include large_phone {
    width: 100%;
  }
}

.footer__links,
.footer__categories {
  ul {
    list-style-type: none;

    li {
      a {
        text-decoration: none;
        color: white;
        padding: 0.8rem 0;
        display: block;
      }
    }
  }
}

.footer__locale {
  background-color: $white;
  color: $black;
  cursor: pointer;
  position: relative;
  align-self: center;
  width: 20rem;
  align-self: flex-start;

  & > div {
    display: flex;
    align-items: center;
    text-align: center;
    padding: 1rem 1.4rem;
    svg {
      width: 3rem;
      margin-right: 0 !important;
    }
  }

  ul {
    list-style-type: none;
    background-color: floralwhite;
    width: 100%;
    position: absolute;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom: 1px solid $black;
    top: -200%;
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden;
    li {
      padding: 1rem 1.4rem;
      display: flex;
      align-items: center;

      svg {
        width: 3rem;
        margin-right: 2rem;
      }
    }
  }
}

.footer__icons {
  ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    width: 40%;
    margin: 0 auto;
    padding: 1rem 0;

    li {
      font-size: 3rem;
      cursor: pointer;
    }
  }

  @include large_phone {
    ul {
      width: 50%;
    }
  }

  @include medium_phone {
    ul {
      width: 60%;
    }
  }

  @include small_phone {
    ul {
      width: 70%;
    }
  }
}

.flag {
  height: 3rem;
  width: 3rem;
  margin-right: 2rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  @include flex_center;
}

.flag-vn {
  background-image: url("../../static/flags/vietnam-flag.svg");
}

.flag-us {
  background-image: url("../../static/flags/us-flag.svg");
}
</style>