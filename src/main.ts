import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta'
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from './filters/date.filter';
import currencyFilter from './filters/currency.filter';
import localizeFilter from './filters/localize.filter';
//import TitlePlugin from './utils/title.plugin';
import firebase from 'firebase/app'
import Loader from '@/components/app/Loader.vue'


import 'firebase/auth'
import 'firebase/database'
import 'materialize-css/dist/js/materialize.min';
import './registerServiceWorker';

const Paginate = require('vuejs-paginate')
const tooltipDirective:any = require('@/directives/tooltip.directive').default
const messagePlugis:any = require('@/utils/message.plugin').default

Vue.config.productionTip = false;

Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('localizeFilter', localizeFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugis)
//Vue.use(TitlePlugin)
Vue.use(VueMeta)


Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

// Initialize Firebase

firebase.initializeApp({
  apiKey: "AIzaSyC54EfJOG9R06bs_TR7OqN0O-qvFDQmJLo",
  authDomain: "works-in-portfolio.firebaseapp.com",
  databaseURL: "https://works-in-portfolio.firebaseio.com",
  projectId: "works-in-portfolio",
  storageBucket: "works-in-portfolio.appspot.com",
  messagingSenderId: "742960061197",
  appId: "1:742960061197:web:9e2bb5d6ff56c52a35ee44",
  measurementId: "G-8VEFVK06DR"
});

let app:any 

// firebase.auth().onIdTokenChanged(function() {

firebase.auth().onAuthStateChanged((user) => {
    if(!app){
      app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');}

});

//firebase.analytics();
