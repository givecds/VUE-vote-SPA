<style src="./css/guide.css"></style>

<template>
  <div id="app">
  <anchor></anchor>
  </div>
</template>

<script>
import anchor from './components/anchor'

export default {
  name: 'app',
  components: {
    anchor
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
