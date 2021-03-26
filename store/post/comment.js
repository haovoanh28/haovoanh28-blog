export const state = () => ({
  isCommenting: false,
});

export const getters = {};

export const mutations = {
  SET_LOADING(state) {
    state.isCommenting = true;
  },
  SET_LOADED(state) {
    state.isCommenting = false;
  }
};

export const actions = {
  async addCommentAsync({ commit }, { comment, postId }) {
    try {
      commit("SET_LOADING");
      const response = await this.$api.post(`/posts/${postId}/comment`, {
        comment
      });
      console.log(response);

      return response.data.data;
    } catch (err) {
      this.$notify({
        type: "error",
        title: "Failed",
        text: err.response.data.message
      });
    } finally {
      commit("SET_LOADED");
    }
  },

  async addReplyToCommentAsync(context, { commentId, postId, replyText }) {
    try {
      const response = await this.$api.post(
        `/posts/${postId}/comment/${commentId}/reply`,
        {
          replyText
        }
      );

      return response.data.data;
    } catch (err) {
      this.$notify({
        type: "error",
        title: "Failed",
        text: err.response.data.message
      });
    }
  }
};
