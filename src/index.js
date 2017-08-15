import Vue from 'vue';
import './extensions/';
import './services/optional';
import './icons/';
import App from './components/App';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
