export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async deletePostByIdAsync({ commit }, id) {
    try {
      commit("post/get/SET_LOADING_ID", id, { root: true });

      const response = await this.$api.$delete(`/posts/${id}`);
      commit("post/get/DELETE_POST", id, { root: true });

      this.$notify({
        type: "success",
        title: "Success",
        text: "Post has been deleted"
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
      console.log(err);
    } finally {
      commit("post/get/SET_LOADING_ID", "", { root: true });
    }
  }
};
