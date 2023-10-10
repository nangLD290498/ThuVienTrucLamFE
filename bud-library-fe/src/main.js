import { createApp } from 'vue'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import globalMixin from './mixins/index'
import { router } from './router/index.js';
import { store } from './store/index.js';
import jQuery from 'jquery'
import Dropdown from 'vue-simple-search-dropdown';
window.jQuery = jQuery
window.$ = jQuery;

import '@popperjs/core';
import '../public/library/bootstrap/dist/js/bootstrap.min.js';
import '../public/library/bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';

let app = createApp(App)
app.mixin(globalMixin);
app.use(router)
app.use(store)
app.use(Dropdown);
app.use(Notifications)
app.mount('#app')

