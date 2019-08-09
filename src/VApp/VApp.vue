<template>
    <main class="app">

        <cursor-fx
            :shape="shape"
            :color="color"
            :outside-size="outsideSizePx"
            :inside-size="insideSizePx"
            :hide-outside="outsideHide"
            :hide-inside="insideHide"
            :force-custom-slot="forceCustomSlot"
            :config="config"
        >
            <span v-if="forceCustomSlot">
                You are awesome
            </span>
        </cursor-fx>

        <div class="grid-container">

            <div class="grid-cell left">
                <aside>
                    <section>
                        <h2>
                            Usage
                        </h2>
                        <p v-text="$library.VUE_APP_DESCRIPTION" />
                    </section>
                    <section>

                        <strong>
                            <label for="shape">
                                Shape
                            </label>
                        </strong>

                        <select id="shape" v-model="shape">
                            <option value="default">DEFAULT</option>
                            <option value="square">SQUARE</option>
                        </select>

                    </section>
                    <section>

                        <strong>
                            <label for="color">
                                Color
                            </label>
                        </strong>

                        <input
                            id="color"
                            v-model="color"
                            type="color"
                        >

                    </section>
                    <section>

                        <strong>
                            <label for="outside-hide">
                                Hide outside
                            </label>
                        </strong>

                        <input
                            id="outside-hide"
                            v-model="outsideHide"
                            type="checkbox"
                        >

                        <strong>
                            <label for="inside-hide">
                                Hide inside
                            </label>
                        </strong>

                        <input
                            id="inside-hide"
                            v-model="insideHide"
                            type="checkbox"
                        >

                    </section>
                    <section>

                        <strong>
                            <label for="outside-size">
                                Outer size
                            </label>
                        </strong>

                        <input
                            id="outside-size"
                            v-model.number.lazy="outsideSize"
                            type="range"
                            :min="insideSize"
                            max="64"
                        >

                        <strong>
                            <label for="inside-size">
                                Inside size
                            </label>
                        </strong>

                        <input
                            id="inside-size"
                            v-model.number.lazy="insideSize"
                            type="range"
                            min="2"
                            :max="outsideSize"
                        >

                    </section>
                    <section>

                        <strong>
                            <label for="slot">
                                Custom slot
                            </label>
                        </strong>

                        <input
                            id="slot"
                            v-model="forceCustomSlot"
                            type="checkbox"
                        >

                    </section>
                    <section>

                        <strong>
                            <h2>Config</h2>
                        </strong>

                        <div class="configs">

                            <h3>Lerps</h3>

                            <div class="configs__item">
                                <label for="dot">
                                    Dot
                                </label>
                                <input
                                    id="dot"
                                    v-model.number.lazy="config.lerps.dot"
                                    type="range"
                                    min="0.001"
                                    max="1"
                                    step=".001"
                                >
                                <span v-text="config.lerps.dot" />
                            </div>

                            <div class="configs__item">
                                <label for="circle">
                                    Circle
                                </label>
                                <input
                                    id="circle"
                                    v-model.number.lazy="config.lerps.circle"
                                    type="range"
                                    min="0.001"
                                    max="1"
                                    step=".001"
                                >
                                <span v-text="config.lerps.circle" />
                            </div>

                            <div class="configs__item">
                                <label for="custom">
                                    Custom Slot
                                </label>
                                <input
                                    id="custom"
                                    v-model.number.lazy="config.lerps.custom"
                                    type="range"
                                    min="0.001"
                                    max="1"
                                    step=".001"
                                >
                                <span v-text="config.lerps.custom" />
                            </div>

                            <div class="configs__item">
                                <label for="opacity">
                                    Opacity
                                </label>
                                <input
                                    id="opacity"
                                    v-model.number.lazy="config.opacity"
                                    type="range"
                                    min="0.01"
                                    max="1"
                                    step=".01"
                                >
                                <span v-text="config.opacity" />
                            </div>

                        </div>

                        <div class="configs">

                            <h3>Scale</h3>

                            <div class="configs__item">
                                <label for="scale">
                                    Scale
                                </label>
                                <input
                                    id="scale"
                                    v-model.number.lazy="config.scale.ratio"
                                    type="range"
                                    min="0.01"
                                    max="1"
                                    step=".01"
                                >
                                <span v-text="config.scale.ratio" />
                            </div>


                            <div class="configs__item">
                                <label for="min">
                                    Min
                                </label>
                                <input
                                    id="min"
                                    v-model.number.lazy="config.scale.min"
                                    type="range"
                                    min="0.01"
                                    max="1"
                                    step=".01"
                                >
                                <span v-text="config.scale.min" />
                            </div>

                            <div class="configs__item">
                                <label for="max">
                                    Max
                                </label>
                                <input
                                    id="max"
                                    v-model.number.lazy="config.scale.max"
                                    type="range"
                                    min="0.01"
                                    max="1"
                                    step=".01"
                                >
                                <span v-text="config.scale.max" />
                            </div>
                        </div>

                    </section>
                    <section>

                        <h3>Try it!</h3>

                        <div class="buttons">
                            <button
                                type="button"
                                title="Hover me"
                                data-cursor-hover
                            >
                                hover me
                            </button>
                        </div>

                    </section>
                </aside>
            </div>

            <div class="grid-cell right">
                <section>
                    <readme />
                </section>
            </div>

        </div>

    </main>
</template>

<script>
    // Markdown
    import readme from '../../README.md';

    // App
    export default {
        name: 'v-app',
        components: {
            readme,
        },
        data: () => (
            {
                shape: 'default',
                color: '#333333',
                outsideSize: 64,
                insideSize: 6,
                outsideHide: false,
                insideHide: false,
                forceCustomSlot: false,
                config: {
                    lerps: {
                        dot: 1,
                        circle: 0.18,
                        custom: 0.23,
                    },
                    scale: {
                        ratio: 0.18,
                        min: 0.5,
                        max: 1,
                    },
                    opacity: 0.1,
                },
            }
        ),
        computed: {
            outsideSizePx() {

                return `${ this.outsideSize }px`;

            },
            insideSizePx() {

                return `${ this.insideSize }px`;

            },
        },
    };
</script>

<style
    scoped
    lang="scss"
    src="./style.scss"
></style>
