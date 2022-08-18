const WeaterModule = (function () {
  const btn = document.querySelector('#getWeatherBtn')

  // click Listener to fetch weatherdata
  btn.addEventListener('click', function () {
    const location = document.querySelector('#location').value
    getWeatherData(location)
  })

  function getWeatherData(location) {
    // public api key
    const apiKey = ''
    // fetch cords from cityname
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`,
      { mode: 'cors' }
    )
      .then(function (res) {
        return res.json()
      })
      .then(function (res) {
        const { lat, lon } = res[0]
        return [lat, lon]
      })
      .then(function (res) {
        // fetch weatherdata from cords
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${res[0]}&lon=${res[1]}&appid=${apiKey}&units=metric`
        )
      })
      .then(function (res) {
        return res.json()
      })
      .then(function (res) {
        console.log(res)
        let weatherCard = WeatherData(res)
        console.log(weatherCard)
        displayWeatherData(weatherCard)
      })
  }

  function displayWeatherData(obj) {
    const title = document.querySelector('#title')
    const date = document.querySelector('#date')
    const temp = document.querySelector('#temp')
    const icon = document.querySelector('#icon')
    const feels_like = document.querySelector('#infos #feels-like')
    const humidity = document.querySelector('#infos #humidity')
    const wind = document.querySelector('#infos #wind')
    const temp_secondary = document.querySelector('#temp_secondary')
    title.textContent = obj.name
    date.textContent = new Date(Date.now()).toDateString()
    temp.textContent = obj.temp
    feels_like.textContent = 'Feels like: ' + obj.feels
    humidity.textContent = 'Humidity: ' + obj.humidity
    wind.textContent = 'Wind: ' + obj.wind
  }
})()

// factory to create a weather object
function WeatherData(data) {
  let name = data.name
  let temp = data.main.temp
  let feels = data.main.feels_like
  let humidity = data.main.humidity
  let wind = data.wind.speed
  let sky = data.weather[0].main
  let iconId = data.weather[0].icon
  let iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`

  return { name, temp, feels, humidity, wind, sky, iconUrl }
}
