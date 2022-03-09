import Vue from "vue";
import App from "./App.vue";

import store from "./store";

import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import VueNoty from "vuejs-noty";
import "vuejs-noty/dist/vuejs-noty.css";

import VueMask from 'v-mask';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUsers, faPen, faXmark);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueNoty);
Vue.use(VueMask);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
