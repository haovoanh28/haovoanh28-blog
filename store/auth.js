export const state = () => {
  return {
    user: "",
    accessToken: "",
    locale: "",
    loading: false
  };
};

export const getters = {};

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_TOKEN(state, payload) {
    state.accessToken = payload;
  },
  SET_LOCALE(state, payload) {
    state.locale = payload;
  },
  SET_LOADING(state) {
    state.loading = true;
  },
  SET_LOADED(state) {
    state.loading = false;
  }
};

export const actions = {
  async updateLocaleAsync(context, locale) {
    await this.$i18n.setLocale(locale);
  }
};
