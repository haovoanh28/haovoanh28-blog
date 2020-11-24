export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async addPostAsync({ commit }, { title, content, coverImg, introduction }) {
    try {
      commit("post/get/SET_LOADING", null, { root: true });
      const response = await this.$api.post("/posts", {
        title,
        content,
        coverImg,
        introduction
      });

      this.$notify({
        type: "success",
        title: "Success",
        text: "Post has been created"
      });

      return response;
    } catch (err) {
      console.log(err);
      Vue.notify({
        type: "error",
        title: "Error",
        text: `${err.response}`
      });
    } finally {
      commit("post/get/SET_LOADED", null, { root: true });
    }
  }
};
