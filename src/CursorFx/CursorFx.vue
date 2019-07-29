<template>
    <div
        v-show="loaded"
        id="cursor-fx"
        ref="cursor"
        :class="classes"
        :style="cssVars"
    >
        <div
            v-show="! hideOutside"
            class="cursor-fx__inner cursor-fx__inner__outside"
            :style="outsideSizes"
        />
        <div
            v-show="( $slots.default || $scopedSlots.default ) || forceCustomSlot"
            class="cursor-fx__inner cursor-fx__inner__custom"
            :style="outsideSizes"
        >
            <slot />
        </div>
        <div
            v-show="! hideInside"
            class="cursor-fx__inner cursor-fx__inner__inside"
            :style="insideSizes"
        />
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
            config: {
                type: Object,
                default: () => {},
            },
            color: {
                type: String,
                default: '#333333',
            },
            colorHover: {
                type: String,
                default: '#333333',
            },
            outsideSize: {
                type: String,
                default: null,
            },
            insideSize: {
                type: String,
                default: null,
            },
            shape: {
                type: String,
                default: null,
            },
            delay: {
                type: [
                    Number,
                    String,
                ],
                default: 100,
            },
            forceCustomSlot: {
                type: Boolean,
                default: false,
            },
            hideOutside: {
                type: Boolean,
                default: false,
            },
            hideInside: {
                type: Boolean,
                default: false,
            },
        },
        data: () => (
            {
                touch: false,
                hover: false,
                loaded: false,
            }
        ),
        computed: {
            classes() {

                const CLASSES = [ COMPONENT ];

                this.hover && CLASSES.push(
                    `${ COMPONENT }--hover`
                );
                this.touch && CLASSES.push(
                    `${ COMPONENT }--touch`
                );
                this.loaded && CLASSES.push(
                    `${ COMPONENT }--loaded`
                );
                this.shape && CLASSES.push(
                    `${ COMPONENT }--shape-${ this.shape }`
                );

                return CLASSES;

            },
            cssVars() {

                return {
                    '--color': this.color,
                    '--color-hover': this.colorHover,
                };

            },
            // Sizes
            outsideSizes() {

                return {
                    width: this.outsideSize,
                    height: this.outsideSize,
                };

            },
            insideSizes() {

                return {
                    width: this.insideSize,
                    height: this.insideSize,
                };

            },
        },
        watch: {
            forceCustomSlot: 'refresh',
            outsideSize: 'refresh',
            insideSize: 'refresh',
            config: {
                handler: 'refresh',
                deep: true,
            },
        },
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

                document.documentElement.classList.remove(
                    'is-cursor-fx-active'
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

            },
            initEvents() {

                // Custom cursor chnages state when hovering on elements with 'data-hover'.
                [
                    ... document.querySelectorAll(
                        '[data-cursor-hover]'
                    ),
                ].forEach(
                    link => {

                        link.addEventListener(
                            'mouseenter',
                            () => {

                                this.$cursor.enter();
                                this.hover = true;

                            },
                            false
                        );
                        link.addEventListener(
                            'mouseleave',
                            () => {

                                this.$cursor.leave();
                                this.hover = false;

                            },
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

            },
            init(
                events = true
            ) {

                this.$cursor = new CursorFx(
                    {
                        el: this.$refs.cursor,
                        base_class: `.${ COMPONENT }`,
                    },
                    this.config,
                );

                events && this.initEvents();

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
                    () => this.init(),
                    parseInt(
                        this.delay
                    )
                );

            },
            refresh(
                newVal = true
            ) {

                newVal && this.$nextTick(
                    () => this.init(
                        false
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
