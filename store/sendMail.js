export const state = () => {
  return {
    loading: false
  };
};

export const getters = {};

export const mutations = {
  SET_LOADING(state) {
    state.loading = true;
  },
  SET_LOADED(state) {
    state.loading = false;
  }
};

export const actions = {
  async sendMailAsync({ commit }, { from, question, content }) {
    try {
      commit("SET_LOADING");
      await this.$api.post("/send-email", {
        from,
        
        question,
        content
      });

      this.$notify({
        type: "success",
        title: "Success",
        text: "Your question has been sent"
      });
    } catch (err) {
      console.log(err);
      Vue.notify({
        type: "error",
        title: "Error",
        text: `${err.response}`
      });
    } finally {
      commit("SET_LOADED");
    }
  }
};
