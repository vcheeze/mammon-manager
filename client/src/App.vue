<template>
    <div id="app">
        <nav>
            <router-link to='/'>Home</router-link>
            <router-link to='/budgets'>Budgets</router-link>
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
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

nav {
    margin-top: 15px;
    a {
        padding: 15px 5px;
    }
}
</style>
