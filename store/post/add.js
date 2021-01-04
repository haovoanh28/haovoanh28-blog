export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async addPostAsync(
    { commit },
    { title, content, postTypes, coverImg, introduction }
  ) {
    try {
      commit("post/get/SET_LOADING", null, { root: true });
      const response = await this.$api.post("/posts", {
        title,
        content,
        coverImg,
        types: postTypes,
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
