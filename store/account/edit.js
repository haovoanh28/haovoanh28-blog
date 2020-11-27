export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async uploadAvatarAsync({ commit }, { userId, data }) {
    try {
      const response = await this.$api.$post(`/user/${userId}/avatar`, data);
      const user = response.data;
      this.$cookies.set("user", user, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });

      this.$notify({
        type: "success",
        title: "Success",
        text: "Your avatar has been updated"
      });

      await commit("auth/SET_USER", user, { root: true });
    } catch (err) {
      console.log(err);
      this.$notify({
        type: "error",
        title: "Failed",
        text: err.response.data.message
      });
    }
  },
  async updateProfileAsync({ commit }, payload) {
    try {
      const { id, fullName, age } = payload;
      const response = await this.$api.$post(`/user/${id}/`, {
        fullName,
        age
      });

      console.log(response);

      const user = response.data;
      this.$cookies.set("user", user, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      });

      this.$notify({
        type: "success",
        title: "Success",
        text: "Your profile has been updated"
      });

      await commit("auth/SET_USER", user, { root: true });
    } catch (err) {
      console.log(err);
      this.$notify({
        type: "error",
        title: "Failed",
        text: err.response.data.message
      });
    }
  }
};
