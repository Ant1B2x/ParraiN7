import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
    faIdCard,
    faKey,
    faUser,
    faUserSecret,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faStar,
    faArrowRight,
    faArrowLeft,
    faAngleRight,
    faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";

library.add(faUserSecret)
library.add(faKey)
library.add(faUser)
library.add(faIdCard)
library.add(faArrowAltCircleLeft)
library.add(faArrowAltCircleRight)
library.add(faStar)
library.add(faArrowRight)
library.add(faArrowLeft)
library.add(faAngleRight)
library.add(faAngleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
