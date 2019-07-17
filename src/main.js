// Vue
import Vue from 'vue';

// Skeleton
import VApp from './VApp';

// Component
import Library from './library';
import CursorFX from './CursorFx';

// Install
Vue.component(
    CursorFX.name,
    CursorFX
);

// Library data
Vue.use(
    Library,
    process.env
);

// Config
const DEBUG = process.env.NODE_ENV === 'development';

Vue.config.silent = ! DEBUG;
Vue.config.productionTip = DEBUG;

new Vue(
    {
        el: '#app',
        render: h => h(
            VApp
        ),
    }
);
