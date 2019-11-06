<template>
  <div class="day">
    <div class="weekday">
      {{day.date}}
    </div>
    <img v-bind:src="icon">
    <div class="temperature">
      <span>Max : {{day.high}}</span>
      <span>Min : {{day.low}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['day'],

  computed: {
    icon: function () {
      return `./static/icons/${this.day.icon}.png`
    }
  }
}
</script>

<style scoped>
.day {
  display: flex;
  flex-direction: column;
  padding: 30px;
}
</style>

