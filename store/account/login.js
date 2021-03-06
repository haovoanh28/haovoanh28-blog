export const state = () => {
  return {
    loading: false
  };
};

export const mutations = {
  SET_LOADING(state) {
    state.loading = true;
  },
  SET_LOADED(state) {
    state.loading = false;
  }
};

export const actions = {
  async loginAsync({ commit }, { email, password }) {
    try {
      commit("SET_LOADING");
      const response = await this.$api.$post("/user/login", {
        email,
        password
      });

      const { accessToken, user } = response.data;

      if (user && accessToken) {
        this.$cookies.set("user", user, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        });
        this.$cookies.set("token", accessToken, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        });
        commit("auth/SET_USER", user, { root: true });
        commit("auth/SET_TOKEN", accessToken, { root: true });

        this.$notify({
          type: "success",
          title: "Success",
          text: "Log in success fully, you will be redirected in a few second",
          duration: 10000
        });

        setTimeout(() => {
          this.$router.push({ path: "/admin/dashboard" });
        }, 1000);
      }
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
      commit("SET_LOADED");
    }
  }
};
