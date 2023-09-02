import { createApp } from 'vue'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import globalMixin from './mixins/index'
import { router } from './router/index.js';
import { store } from './store/index.js';
import jQuery from 'jquery'
window.jQuery = jQuery
window.$ = jQuery;

import '@popperjs/core';
import '../public/library/bootstrap/dist/js/bootstrap.min.js';
// import '../public/library/jquery/dist/jquery.min.js';
// import '../public/library/popper.js/dist/popper.js';
// import '../public/library/tooltip.js/dist/tooltip.js';
// import '../public/library/bootstrap/dist/js/bootstrap.min.js';
// import '../public/library/jquery.nicescroll/dist/jquery.nicescroll.min.js';
// import '../public/js/stisla.js';
// import '../public/js/custom.js';
// import '../public/js/scripts.js';

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import '../public/library/bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';



let app = createApp(App)
app.mixin(globalMixin);
// app.use(BootstrapVue)
// app.use(IconsPlugin)
app.use(router)
app.use(store)
app.use(Notifications)
app.mount('#app')

