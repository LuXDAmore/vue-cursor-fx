<template>
    <div
        v-show="loaded"
        v-if="! destroyed"
        :id="id"
        ref="cursor"
        :class="classes"
        :style="cssVars"
        class="cursor-fx"
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
            disabled: {
                type: Boolean,
                default: false,
            },
            id: {
                type: String,
                default: 'cursor-fx',
            },
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
                destroyed: true,
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

            if( this.disabled )
                return;

            this.touch = this.isTouchDevice();

            ( this.allowOnMobile || ! this.touch ) && this.start();

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
            // Cursor events
            cursorHover() {

                this.hover = true;
                this.$cursor && this.$cursor.enter();

            },
            cursorLeave() {

                this.hover = false;
                this.$cursor && this.$cursor.leave();

            },
            cursorClick() {

                this.$cursor && this.$cursor.click();

            },
            cursorEnterHidden() {

                this.$cursor && this.$cursor.enterHidden();

            },
            cursorLeaveHidden() {

                this.$cursor && this.$cursor.leaveHidden();

            },
            cursorMixBlendMode(
                el
            ) {

                this.$cursor && this.$cursor.mixBlendMode(
                    el?.target?.dataset?.cursorMixBlendMode ?? null
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
                            this.cursorHover,
                            false,
                        );
                        link.addEventListener(
                            'mouseleave',
                            this.cursorLeave,
                            false,
                        );
                        link.addEventListener(
                            'click',
                            this.cursorClick,
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
                            this.cursorEnterHidden,
                            false,
                        );
                        link.addEventListener(
                            'mouseleave',
                            this.cursorLeaveHidden,
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
                            this.cursorMixBlendMode,
                            false,
                        );
                        link.addEventListener(
                            'mouseleave',
                            this.cursorMixBlendMode,
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

                this.loaded = true;

                this.$emit(
                    'ready',
                    this.$cursor,
                );

                document.documentElement.classList.add(
                    'is-cursor-fx-active',
                );

                this.$emit(
                    'after-start'
                );

            },
            async destroy(
                refresh = false
            ) {

                this.$emit(
                    'before-destroy'
                );

                this.destroyTimeout();

                document.documentElement.classList.remove(
                    'is-cursor-fx-active',
                );

                this.loaded = false;

                // Events destroy
                [
                    ... document.querySelectorAll(
                        '[data-cursor-hover]',
                    ),
                ].forEach(
                    link => {

                        link.removeEventListener(
                            'mouseenter',
                            this.cursorLeave,
                            false,
                        );
                        link.removeEventListener(
                            'mouseleave',
                            this.cursorLeave,
                            false,
                        );
                        link.removeEventListener(
                            'click',
                            this.cursorClick,
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
                            this.cursorEnterHidden,
                            false,
                        );
                        link.removeEventListener(
                            'mouseleave',
                            this.cursorLeaveHidden,
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
                            this.cursorMixBlendMode,
                            false,
                        );
                        link.removeEventListener(
                            'mouseleave',
                            this.cursorMixBlendMode,
                            false,
                        );

                    },
                );

                // Data destroy
                await this.$nextTick();

                this.$cursor && this.$cursor.destroy();
                this.$cursor = null;
                this.destroyed = true;

                this.$emit(
                    'after-destroy'
                );

                // Refresh after destroy
                refresh && this.start();

            },
            async start() {

                if( ! this.destroyed )
                    return;

                this.destroyed = false;

                this.destroyTimeout();

                await this.$nextTick();

                this.$emit(
                    'before-start'
                );

                this.$timeout = setTimeout(
                    () => this.init(),
                    parseInt(
                        this.delay,
                    ),
                );

            },
            refresh() {

                this.destroy(
                    true
                );

            },
            // Timers
            destroyTimeout() {

                this.$timeout && clearTimeout(
                    this.$timeout
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
