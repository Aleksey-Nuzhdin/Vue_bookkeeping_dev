import Vue from 'vue';
import firebase from 'firebase/app';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: ()=> import('../views/Home.vue'),
  },{
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: ()=> import('../views/Login.vue'),
  },{
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: ()=> import('../views/Categories.vue'),
  },{
    path: '/detail/:recordID',
    name: 'detail',
    meta: {layout: 'main', auth: true},
    component: ()=> import('../views/Detail.vue'),
  },{
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: ()=> import('../views/History.vue'),
  },{
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: ()=> import('../views/Planning.vue'),
  },{
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: ()=> import('../views/Profile.vue'),
  },{
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: ()=> import('../views/Record.vue'),
  },{
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: ()=> import('../views/Register.vue'),
  },
 
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const currUser = firebase.auth().currentUser
  const isAuth = to.matched.some(rout => rout.meta.auth)
  
  if(!currUser && isAuth){  next('/login?message=login')
  }else{ next() }
})

export default router;
