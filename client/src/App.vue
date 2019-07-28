<template>
    <v-app id="app">
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/budgets">Budgets</router-link>
            <router-link to="/categories">Categories</router-link>
            <router-link to="/tags">Tags</router-link>
        </nav>
        <v-content>
            <router-view />
        </v-content>
        <v-footer app></v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
body {
    margin: 0;
}
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
nav {
    padding: 1.25rem;
    background-color: $color_primary;
    a {
        padding: 15px 5px;
        &:hover {
            color: $color_quaternary;
        }
    }
}
</style>
