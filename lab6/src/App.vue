<template>
  <div id="app">
    <Forecast/>
  </div>
</template>

<script>
import Forecast from './components/Forecast'

export default {
  name: 'app',
  components: {
    Forecast
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
