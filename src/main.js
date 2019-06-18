import Vue from 'vue';
import popup from './plugin/popup';

import App from './App';

Vue.config.productionTip = false;

Vue.use(popup);

new Vue({
    render: h => h(App),
}).$mount('#app');
