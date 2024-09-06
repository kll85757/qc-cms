import Vue from 'vue';
import Cookies from 'js-cookie';
import axios from './utils/request'; // Import your Axios instance

import 'normalize.css/normalize.css'; // CSS reset

import Element from 'element-ui';
import './styles/element-variables.scss';
import enLang from 'element-ui/lib/locale/lang/en'; // You can remove this if using Chinese language pack

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import './icons'; // icon
import './permission'; // permission control
import './utils/error-log'; // error log

import * as filters from './filters'; // global filters

// Mock server for production environment
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

// Log the route change for debugging
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.path);
  next();
});

// Use Element UI
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // Use default language (Chinese) by removing this line if needed
});

// Register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
