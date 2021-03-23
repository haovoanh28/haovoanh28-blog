export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async logoutAsync({ commit }) {
    this.$router.push({ path: "/admin/login" });
    this.$cookies.remove("user");
    this.$cookies.remove("token");
    commit("auth/SET_USER", "", { root: true });
    location.reload();
  }
};
