import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@/assets/css/style.css";
// import BootstrapVue from "bootstrap-vue";

// Vue.config.productionTip = process.env.NODE_ENV === 'production';
// Vue.use(BootstrapVue);

const app = createApp(App);
app.use(store);
app.use(router);
// app.component(BootstrapVue);
// app.mixin({
//   setup() {
//     provide(BootstrapVue);
//   },
// });
app.mount("#app");
// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount("#app")
