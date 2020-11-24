export default async ({ app, store }) => {
  const user = await app.$cookies.get("user");
  const token = await app.$cookies.get("token");

  await store.commit("auth/SET_USER", user);
  await store.commit("auth/SET_TOKEN", token);
};
