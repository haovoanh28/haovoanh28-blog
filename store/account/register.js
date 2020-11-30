export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async registerAsync({ commit }, payload) {
    try {
      commit("auth/SET_LOADING", null, { root: true });
      const response = await this.$api.$post("/user/register", {
        ...payload
      });

      this.$notify({
        type: "success",
        title: "Success",
        text: "Account has been created successfully"
      });

      return true;
    } catch (err) {
      console.log(err.response);
      this.$notify({
        type: "error",
        title: "Failed",
        text: err.response.data.message
      });

      return false;
    } finally {
      commit("auth/SET_LOADED", null, { root: true });
    }
  }
};
