<template>
  <Account />
</template>

<script>
import Account from './components/Accounts/Account'

export default {
  name: 'app',
  components: {
    Account
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
