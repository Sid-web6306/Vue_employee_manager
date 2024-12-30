import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false;
const auth = getAuth();
let app;
onAuthStateChanged(auth, () => {
  if(!app){
    new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
});

