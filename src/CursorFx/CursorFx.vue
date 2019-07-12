<template>
    <div
        id="cursor-fx"
        ref="cursor"
        class="cursor"
        :class="{
            touch,
            loaded,
        }"
    >
        <div class="cursor__inner cursor__inner--circle" />
        <div class="cursor__inner cursor__inner--dot" />
    </div>
</template>
<script>
    // Timers
    import { setTimeout } from 'timers';

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
                default: 300,
            },
        },
        data: () => (
            {
                touch: false,
                loaded: false,
            }
        ),
        created() {

            this.$cursor = null;

        },
        mounted() {

            ! this.isTouchDevice() && this.$nextTick(
                () => setTimeout(
                    this.init,
                    parseInt(
                        this.delay
                    )
                )
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

                document.documentElement.classList.remove(
                    'is-custom-cursor'
                );

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
                            '[data-cursor-player]'
                        ),
                    ].forEach(
                        link => {

                            link.removeEventListener(
                                'mouseenter',
                                () => this.$cursor.enterPlayer(),
                                false
                            );
                            link.removeEventListener(
                                'mouseleave',
                                () => this.$cursor.leavePlayer(),
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

            },
            init() {

                document.documentElement.classList.add(
                    'is-custom-cursor'
                );

                this.$cursor = new CursorFx(
                    this.$refs.cursor,
                    {
                        player: 1,
                    }
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
                        '[data-cursor-player]'
                    ),
                ].forEach(
                    link => {

                        link.addEventListener(
                            'mouseenter',
                            () => this.$cursor.enterPlayer(),
                            false
                        );
                        link.addEventListener(
                            'mouseleave',
                            () => this.$cursor.leavePlayer(),
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

                this.loaded = true;

            },
        },
    };
</script>

<style
    lang="scss"
    src="./common.scss"
></style>

<style
    scoped
    lang="scss"
    src="./style.scss"
></style>
