import * as Geo from './geo'

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

export async function getForecast() {
  const position = await Geo.getCurrentPosition();

  const apikey = '405152becc0a4bb1bc43444f00daf550'
  const latitude = position.coords.latitude
  const longitude = position.coords.longitude

  const response = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${apikey}`)
  const json = await response.json()

  return {
    city: json.city_name,
    state: json.country_code,
    forecast: json.data.map((day) => ({
      date: day.datetime,
      icon: day.weather.icon,
      high: day.high_temp,
      low: day.low_temp
    }))
  }
}
