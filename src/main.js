import Vue from 'vue';
import VApp from './VApp';
import CursorFX from './CursorFx';

// Config
const DEBUG = process.env.NODE_ENV === 'development';

Vue.config.silent = ! DEBUG;
Vue.config.productionTip = DEBUG;

Vue.component(
    CursorFX.name,
    CursorFX
);

new Vue(
    {
        el: '#app',
        render: h => h(
            VApp
        ),
    }
);
