export default function({ $axios, store }, inject) {
  const baseURL = process.env.baseURL;

  const api = $axios.create({ baseURL: baseURL });
  api.interceptors.request.use(
    config => {
      const token = store.state.auth.accessToken;
      if (token) config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  inject("api", api);
}
