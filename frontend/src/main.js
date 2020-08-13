import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import 
{
    faLock, faSignInAlt, faUserPlus, faSignOutAlt, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import i18n from './i18n';

library.add(faUser, faLock, faSignInAlt, faUserPlus, faSignOutAlt, faArrowLeft);
Vue.use(VueI18n);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    i18n,
    render: (h) => h(App),
}).$mount('#app');
