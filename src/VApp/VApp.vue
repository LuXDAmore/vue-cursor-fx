<template>
    <main class="app">

        <cursor-fx
            :shape="shape"
            :color="color"
            :outside-size="outsideSizePx"
            :inside-size="insideSizePx"
            :hide-outside="outsideHide"
            :hide-inside="insideHide"
        />

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
                            v-model.number="outsideSize"
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
                            v-model.number="insideSize"
                            type="range"
                            min="2"
                            :max="outsideSize"
                        >

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

<style src="modern-normalize/modern-normalize.css"></style>

<style
    lang="scss"
    src="./global.scss"
></style>

<style
    scoped
    lang="scss"
    src="./style.scss"
></style>
