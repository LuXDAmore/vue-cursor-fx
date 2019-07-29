// Import vue component
import component from './CursorFx.vue';

const plugin = {
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
export { component as CursorFx };
export default plugin;

// Auto install
if( typeof window !== 'undefined' && window.Vue ) {

    window.Vue.use(
        plugin
    );

}
