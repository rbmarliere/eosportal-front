import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './filters'
import i18n from './locales/index'
import Toasted from 'vue-toasted';

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
Vue.config.productionTip = false;

declare global {
  interface Window { scatter: any; }
}

const lang = store.state.language;
if (lang) {
  i18n.locale = lang;
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

Vue.use(Toasted)

ScatterJS.plugins( new ScatterEOS() );
ScatterJS.scatter.connect("eosportal.io").then((connected: boolean) => {
  if(!connected) return false;
  store.dispatch('setScatter', ScatterJS.scatter);
  window.scatter = null;
});
