import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false

router.beforeEach((to,from,next) => {

  let isLogin = to.matched.some( record => (record.name === "login" || record.name === "register" ));
  let requiresAuth = to.matched.some( record => record.meta.requiresAuth);
  let isAuthUser = store.getters.isAuthUser

  if (isLogin && isAuthUser){
    next("/");
  }

  if (requiresAuth && !isAuthUser) {
    next("login");
  }else{
    next();
  }
})


if(localStorage.getItem("token")){
  store.commit("setToken", localStorage.getItem("token"))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
