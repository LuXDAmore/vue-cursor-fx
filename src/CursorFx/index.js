// Import vue component
import component from './CursorFx.vue';

const plugin = {
    CursorFx: component,
    installed: false,
    install(
        Vue
    ) {

        if( plugin.installed )
            return;

        plugin.installed = true;

        Vue.component(
            component.name,
            component
        );

    },
};

// Auto install
let GlobalVue = null;

if( typeof window !== 'undefined' )
    GlobalVue = window.Vue;
else if( typeof global !== 'undefined' )
    GlobalVue = global.Vue;

GlobalVue && GlobalVue.use(
    plugin
);

// To allow use as module (npm/webpack/etc.) export component
export default plugin;
