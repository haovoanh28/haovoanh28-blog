export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async editPostByIdAsync({ commit }, payload) {
    try {
      commit("post/get/SET_LOADING", null, { root: true });
      const { coverImg, title, content, introduction, types } = payload;
      const response = await this.$api.$put(`/posts/${payload._id}`, {
        coverImg,
        title,
        content,
        introduction,
        types
      });

      // const updatedPost = response.data;

      // commit("post/get/EDIT_POST", updatedPost, { root: true });

      console.log(response);
      this.$notify({
        type: "success",
        title: "Success",
        text: "Post has been updated"
      });
    } catch (err) {
      console.log(err);
      if (err.response) {
        this.$notify({
          type: "error",
          title: "Failed",
          text: err.response.data.message
        });
      }
    } finally {
      commit("post/get/SET_LOADED", null, { root: true });
    }
  }
};
