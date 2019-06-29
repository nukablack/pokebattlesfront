import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import About from './components/About.vue'
import OakPokedex from './components/OakPokedex.vue'
import Fight from './components/Fight.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/oakPokedex',
      name: 'oakpokedex',
      component: OakPokedex
    },
    {
      path: '/fight',
      name: 'fight',
      component: Fight
    }
  ]
})
