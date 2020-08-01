import Vue from 'vue';
// import App from './App.vue';
import Login from './components/Login.vue';

Vue.config.productionTip = false;

new Vue({
    // render: (h) => h(App),
    render: (h) => h(Login),
}).$mount('#app');
