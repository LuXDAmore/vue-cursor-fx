/**
 * Creates an instance of the design system
 *
 * @function install
 * @param {VueInstance} Vue Vue instance.
 */
export default {
    install(
        Vue,
        options,
    ) {

        const OPTIONS = options;

        Vue.library = OPTIONS;
        Vue.prototype.$library = OPTIONS;

    },
};
