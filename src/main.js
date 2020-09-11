import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/common.css";
import "@/assets/css/transition.css";
import {
  Checkbox,
  Icon,
  Field,
  Pagination,
  Collapse,
  CollapseItem,
  Button,
  Toast
} from "vant";

Vue.config.productionTip = false;
Vue.use(Checkbox)
  .use(Icon)
  .use(Pagination)
  .use(Field)
  .use(Collapse)
  .use(CollapseItem)
  .use(Button)
  .use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
