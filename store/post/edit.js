export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async editPostByIdAsync({ commit }, payload) {
    try {
      commit("post/get/SET_LOADING", null, { root: true });
      const { coverImg, title, content, introduction } = payload;
      const response = await this.$api.$put(`/posts/${payload._id}`, {
        coverImg,
        title,
        content,
        introduction
      });

      console.log(response);
      this.$notify({
        type: "success",
        title: "Success",
        text: "Post has been updated"
      });
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
