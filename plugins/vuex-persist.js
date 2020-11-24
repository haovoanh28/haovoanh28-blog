import VuexPersistence from "vuex-persist";

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    key: "vuex",
    modules: ["auth"]
  }).plugin(store);
};
