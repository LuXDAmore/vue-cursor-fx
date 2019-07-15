<template>
    <main class="app" :class="{ dark }">

        <h1>Vue Cursor Fx</h1>

        <cursor-fx :dark="dark" />

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

<style
    scoped
    lang="scss"
    src="./style.scss"
></style>
