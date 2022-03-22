import Vue from 'vue';
import popup from './plugin/popup';

import App from './App';

Vue.config.productionTip = false;

Vue.use(popup, {
    // parentSelector: '#inside-no-existing',
});

new Vue({
    render: (h) => h(App),
}).$mount('#app');
