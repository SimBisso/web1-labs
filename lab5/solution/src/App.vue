<template>
  <div id="app">
    <TodoApp/>
  </div>
</template>

<script>
  import TodoApp from "@/components/TodoApp";
export default {
  name: 'app',
  components: {
    TodoApp
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
