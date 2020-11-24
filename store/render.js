export const state = () => ({
  isMenu: false
});

export const getters = {};

export const mutations = {
  SET_OPEN_MENU(state) {
    state.isMenu = true;
  },
  SET_CLOSE_MENU(state) {
    state.isMenu = false;
  }
};

export const actions = {};
