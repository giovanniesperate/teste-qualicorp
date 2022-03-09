import Vue from "vue";
import Vuex from "vuex";

import cliente from "./modules/cliente";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cliente,
  },
});
