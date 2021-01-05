export const state = () => ({
  loading: false,
  searchedPosts: []
});

export const getters = {};

export const mutations = {
  SET_LOADING(state) {
    state.loading = true;
  },
  SET_LOADED(state) {
    state.loading = false;
  },
  SET_SEARCHED_POSTS(state, payload) {
    state.searchedPosts = payload;
  }
};

export const actions = {
  async searchPostAsync({ commit }, searchString) {
    try {
      commit("SET_LOADING");
      const response = await this.$api.$get(
        `/posts/search?string=${searchString}`
      );
      commit("SET_SEARCHED_POSTS", response.data);
    } catch (err) {
      commit("SET_SEARCHED_POSTS", []);

      if (err.response) {
        this.$notify({
          type: "warn",
          title: "Not Found",
          text: err.response.data.message
        });
      }
    } finally {
      commit("SET_LOADED");
    }
  }
};
