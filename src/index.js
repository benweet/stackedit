import Vue from 'vue';
import App from './components/App';
import store from './store';
import './extensions/';
import './services/optional';
import './icons/';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
});
