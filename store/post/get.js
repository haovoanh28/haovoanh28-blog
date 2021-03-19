export const state = () => {
  return {
    posts: [],
    paginatedPosts: [],
    totalPages: 0,
    loading: false,
    loadingId: "",
    notFound: false,
    typesCount: {}
  };
};

export const mutations = {
  SET_POST(state, payload) {
    state.posts = payload;
  },
  SET_PAGINATED_POSTS(state, payload) {
    state.paginatedPosts = payload;
  },
  SET_TOTAL_PAGES(state, payload) {
    state.totalPages = payload;
  },
  DELETE_POST(state, id) {
    const index = state.paginatedPosts.findIndex(p => p._id === id);
    state.paginatedPosts.splice(index, 1);
  },
  SET_LOADING(state) {
    state.loading = true;
  },
  SET_LOADED(state) {
    state.loading = false;
  },
  SET_LOADING_ID(state, id) {
    state.loadingId = id;
  },
  SET_NOT_FOUND(state, payload) {
    state.notFound = payload;
  },
  SET_TYPES_COUNT(state, payload) {
    state.typesCount = payload;
  }
};

export const actions = {
  async getPostsAsync({ commit }) {
    try {
      commit("SET_LOADING");
      const response = await this.$api.$get("/posts");
      commit("post/get/SET_POST", response.data, { root: true });
    } catch (err) {
      console.log(err);
    } finally {
      commit("SET_LOADED");
    }
  },
  async getPostByPageAsync({ commit }, { page, limit }) {
    try {
      commit("SET_LOADING");
      const response = await this.$api.get(
        `/posts/pages/?page=${page}&limit=${limit}`
      );
      const { posts, totalPages, typesCount } = response.data.data;

      commit("SET_PAGINATED_POSTS", posts);
      commit("SET_TOTAL_PAGES", totalPages);
      commit("SET_TYPES_COUNT", typesCount);
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
  },
  async getPostByIdAsync({ commit }, id) {
    try {
      commit("SET_LOADING");
      const response = await this.$api.$get(`/posts/${id}`);
      return response.data;
    } catch (err) {
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
