<template>
  <div id="app">
    <SoloLink/>
  </div>
</template>

<script>
import SoloLink from './components/SoloLink'

export default {
  name: 'App',
  components: {
    SoloLink,
  }
}
</script>

<style>
#app {
  max-width: 800px;
  margin: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
