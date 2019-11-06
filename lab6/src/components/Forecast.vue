<template>
  <div>
    <h1>Weather.JS</h1>
    <h2>
      <i class="icon-compass icon-2x"></i>
      <span class="city">{{city}}</span>,
      <span>{{state}}</span>
    </h2>
    <div class="days">
      <Day
        v-for="day in forecast"
        v-bind:day="day"
        v-bind:key="day.weekday" />
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import Day from '@/components/Day'

export default {
  name: 'Forecast',

  components: {
    Day
  },

  data: () => ({
    city: '',
    state: '',
    forecast: []
  }),

  async created() {
    const {forecast, city, state} = await api.getForecast()
    this.forecast = forecast
    this.city = city
    this.state = state
    console.log(this.forecast)
  }
}
</script>

<style scoped>
.days {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
