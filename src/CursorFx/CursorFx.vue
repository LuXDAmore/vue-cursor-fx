<template>
    <div
        v-show="loaded"
        id="cursor-fx"
        ref="cursor"
        class="cursor-fx"
        :class="classes"
        :style="cssVars"
    >
        <div
            v-show="! hideOutside"
            class="cursor-fx__inner cursor-fx__inner__outside"
            :style="outsideSizes"
        />
        <div
            v-show="( !! $slots.default || !! $scopedSlots.default ) || forceCustomSlot"
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

    // Component
    export default {
        name: 'cursor-fx',
        inheritAttrs: false,
        props: {
            config: {
                type: Object,
                default: () => {},
            },
            mixBlendMode: {
                type: String,
                default: null,
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
                default: 60,
            },
            forceCustomSlot: {
                type: Boolean,
                default: false,
            },
            allowOnMobile: {
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

                return {
                    'cursor-fx--hover': this.hover,
                    'cursor-fx--touch': this.touch,
                    'cursor-fx--loaded': this.loaded,
                    [ `cursor-fx--shape-${ this.shape }` ]: this.shape,
                };

            },
            cssVars() {

                return {
                    '--color': this.color,
                    '--color-hover': this.colorHover,
                    'mix-blend-mode': this.mixBlendMode,
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

            ( this.allowOnMobile || ! this.touch ) && this.$nextTick(
                this.start,
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
                    'is-cursor-fx-active',
                );

                if( this.$cursor ) {

                    [
                        ... document.querySelectorAll(
                            '[data-cursor-hover]',
                        ),
                    ].forEach(
                        link => {

                            link.removeEventListener(
                                'mouseenter',
                                () => this.$cursor.enter(),
                                false,
                            );
                            link.removeEventListener(
                                'mouseleave',
                                () => this.$cursor.leave(),
                                false,
                            );
                            link.removeEventListener(
                                'click',
                                () => this.$cursor.click(),
                                false,
                            );

                        },
                    );

                    [
                        ... document.querySelectorAll(
                            '[data-cursor-hidden]',
                        ),
                    ].forEach(
                        link => {

                            link.removeEventListener(
                                'mouseenter',
                                () => this.$cursor.enterHidden(),
                                false,
                            );
                            link.removeEventListener(
                                'mouseleave',
                                () => this.$cursor.leaveHidden(),
                                false,
                            );

                        },
                    );

                    [
                        ... document.querySelectorAll(
                            '[data-cursor-mix-blend-mode]',
                        ),
                    ].forEach(
                        link => {

                            link.removeEventListener(
                                'mouseenter',
                                () => this.$cursor.mixBlendMode(),
                                false,
                            );
                            link.removeEventListener(
                                'mouseleave',
                                () => this.$cursor.mixBlendMode(),
                                false,
                            );

                        },
                    );

                }

                this.$timeout && clearTimeout(
                    this.$timeout,
                );

            },
            initEvents() {

                // Custom cursor changes state when hovering on elements with 'data-hover'.
                [
                    ... document.querySelectorAll(
                        '[data-cursor-hover]',
                    ),
                ].forEach(
                    link => {

                        link.addEventListener(
                            'mouseenter',
                            () => {

                                this.$cursor.enter();
                                this.hover = true;

                            },
                            false,
                        );
                        link.addEventListener(
                            'mouseleave',
                            () => {

                                this.$cursor.leave();
                                this.hover = false;

                            },
                            false,
                        );
                        link.addEventListener(
                            'click',
                            () => this.$cursor.click(),
                            false,
                        );

                    },
                );

                [
                    ... document.querySelectorAll(
                        '[data-cursor-hidden]',
                    ),
                ].forEach(
                    link => {

                        link.addEventListener(
                            'mouseenter',
                            () => this.$cursor.enterHidden(),
                            false,
                        );
                        link.addEventListener(
                            'mouseleave',
                            () => this.$cursor.leaveHidden(),
                            false,
                        );

                    },
                );

                [
                    ... document.querySelectorAll(
                        '[data-cursor-mix-blend-mode]',
                    ),
                ].forEach(
                    link => {

                        link.addEventListener(
                            'mouseenter',
                            el => this.$cursor.mixBlendMode(
                                el.target.dataset.cursorMixBlendMode, 
                            ),
                            false,
                        );
                        link.addEventListener(
                            'mouseleave',
                            () => this.$cursor.mixBlendMode(),
                            false,
                        );

                    },
                );

            },
            init(
                events = true,
            ) {

                this.$cursor = new CursorFx(
                    {
                        el: this.$refs.cursor,
                        base_class: '.cursor-fx',
                    },
                    {
                        mixBlendMode: this.mixBlendMode,
                        ... this.config,
                    },
                );

                events && this.initEvents();

                this.$emit(
                    'ready',
                    this.$cursor,
                );

                document.documentElement.classList.add(
                    'is-cursor-fx-active',
                );

                this.loaded = true;

            },
            start() {

                this.$timeout = setTimeout(
                    () => this.init(),
                    parseInt(
                        this.delay,
                    ),
                );

            },
            refresh(
                newVal = true,
            ) {

                newVal && this.$nextTick(
                    () => this.init(
                        false,
                    ),
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
