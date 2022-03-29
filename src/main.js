import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './style/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import myplugins from './plugins/myplugins.js';

Vue.use(myplugins);

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  require('./mock/index.js')
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
