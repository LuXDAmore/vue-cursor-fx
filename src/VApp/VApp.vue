<template>
    <main class="app">

        <cursor-fx />

        <div class="grid-container">

            <div class="grid-cell left">
                <section>
                    <h1 v-text="$library.VUE_APP_TITLE" />
                    <p v-text="$library.VUE_APP_DESCRIPTION" />
                </section>
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
