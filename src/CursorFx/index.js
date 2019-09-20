// Import vue component
import component from './CursorFx.vue';

const plugin = {
    CursorFx: component,
    install(
        Vue
    ) {

        Vue.component(
            component.name,
            component
        );

    },
};

// To allow use as module (npm/webpack/etc.) export component
export default plugin;

// Auto install
typeof window !== 'undefined' && window.Vue && window.Vue.use(
    plugin
);
