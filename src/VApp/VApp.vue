<template>
    <main class="app" :class="{ dark }">

        <h1>Vue Cursor Fx</h1>

        <button
            type="button"
            title="Change me"
            data-cursor-hover
            @click="dark = ! dark"
        >
            {{ dark ? 'Light' : 'Dark' }} mode
        </button>

        <cursor-fx :dark="! dark" />

    </main>
</template>

<script>
    // App
    export default {
        name: 'v-app',
        data: () => (
            {
                dark: false,
            }
        ),
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
