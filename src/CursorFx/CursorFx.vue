<template>
    <div
        id="cursor-fx"
        ref="cursor"
        class="cursor"
        :class="{
            touch,
            loaded,
            dark,
        }"
    >
        <div v-if="! hideCircle" class="cursor__inner cursor__inner--circle" />
        <div v-if="$slots.default || $scopedSlots.default" class="cursor__inner cursor__inner--custom">
            <slot />
        </div>
        <div v-if="! hideDot" class="cursor__inner cursor__inner--dot" />
    </div>
</template>

<script>
    // Timers
    import { setTimeout, clearTimeout } from 'timers';

    // Cursor
    import CursorFx from './cursor-fx';

    // Init
    const COMPONENT = 'cursor-fx';

    // Component
    export default {
        name: COMPONENT,
        inheritAttrs: false,
        props: {
            delay: {
                type: [
                    Number,
                    String,
                ],
                default: 100,
            },
            hideCircle: {
                type: Boolean,
                default: false,
            },
            hideDot: {
                type: Boolean,
                default: false,
            },
            dark: {
                type: Boolean,
                default: false,
            },
        },
        data: () => (
            {
                touch: false,
                loaded: false,
            }
        ),
        created() {

            this.$timeout = null;
            this.$cursor = null;

        },
        mounted() {

            this.touch = this.isTouchDevice();

            ! this.touch && this.$nextTick(
                this.start
            );

        },
        beforeDestroy() {

            this.destroy();

        },
        methods: {
            isTouchDevice() {

                return (
                    'ontouchstart' in window
                    || navigator.MaxTouchPoints > 0
                    || navigator.msMaxTouchPoints > 0
                );

            },
            destroy() {

                if( this.$cursor ) {

                    [
                        ... document.querySelectorAll(
                            '[data-cursor-hover]'
                        ),
                    ].forEach(
                        link => {

                            link.removeEventListener(
                                'mouseenter',
                                () => this.$cursor.enter(),
                                false
                            );
                            link.removeEventListener(
                                'mouseleave',
                                () => this.$cursor.leave(),
                                false
                            );
                            link.removeEventListener(
                                'click',
                                () => this.$cursor.click(),
                                false
                            );

                        }
                    );

                    [
                        ... document.querySelectorAll(
                            '[data-cursor-hidden]'
                        ),
                    ].forEach(
                        link => {

                            link.removeEventListener(
                                'mouseenter',
                                () => this.$cursor.enterHidden(),
                                false
                            );
                            link.removeEventListener(
                                'mouseleave',
                                () => this.$cursor.leaveHidden(),
                                false
                            );

                        }
                    );

                }

                this.$timeout && clearTimeout(
                    this.$timeout
                );

                document.documentElement.classList.remove(
                    'is-cursor-fx-active'
                );

            },
            init() {

                this.$cursor = new CursorFx(
                    this.$refs.cursor
                );

                // Custom cursor chnages state when hovering on elements with 'data-hover'.
                [
                    ... document.querySelectorAll(
                        '[data-cursor-hover]'
                    ),
                ].forEach(
                    link => {

                        link.addEventListener(
                            'mouseenter',
                            () => this.$cursor.enter(),
                            false
                        );
                        link.addEventListener(
                            'mouseleave',
                            () => this.$cursor.leave(),
                            false
                        );
                        link.addEventListener(
                            'click',
                            () => this.$cursor.click(),
                            false
                        );

                    }
                );

                [
                    ... document.querySelectorAll(
                        '[data-cursor-hidden]'
                    ),
                ].forEach(
                    link => {

                        link.addEventListener(
                            'mouseenter',
                            () => this.$cursor.enterHidden(),
                            false
                        );
                        link.addEventListener(
                            'mouseleave',
                            () => this.$cursor.leaveHidden(),
                            false
                        );

                    }
                );

                this.$emit(
                    'ready',
                    this.$cursor
                );

                document.documentElement.classList.add(
                    'is-cursor-fx-active'
                );

                this.loaded = true;

            },
            start() {

                this.$timeout = setTimeout(
                    this.init,
                    parseInt(
                        this.delay
                    )
                );

            },
        },
    };
</script>

<style
    lang="scss"
    src="./global.scss"
></style>

<style
    scoped
    lang="scss"
    src="./style.scss"
></style>
