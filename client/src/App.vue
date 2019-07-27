<template>
    <div id="app">
        <nav>
            <router-link to='/'>Home</router-link>
            <router-link to='/budgets'>Budgets</router-link>
            <router-link to='/categories'>Categories</router-link>
        </nav>
        <router-view />
    </div>
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
        color: #fff;
    }
}
</style>
