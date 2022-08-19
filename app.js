const WeaterModule = (function () {
  const btn = document.querySelector('#getWeatherBtn')
  const location = document.querySelector('#location')

  // event Listener to fetch weatherdata
  btn.addEventListener('click', function () {
    const val = location.value
    if (val === '') {
      alert('Please enter a city name')
    } else {
      getWeatherData(val)
      document.querySelector('#location').value = ''
    }
  })

  location.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      const val = location.value
      if (val === '') {
        alert('Please enter a city name')
      } else {
        getWeatherData(val)
        document.querySelector('#location').value = ''
      }
    }
  })

  function getWeatherData(location) {
    // public api key
    const apiKey = ''
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    )
      .then(function (res) {
        if (res.status === 404) {
          throw new Error('City not found!')
        }
        return res.json()
      })
      .then(function (res) {
        console.log(res)
        let weatherCard = WeatherData(res)
        displayWeatherData(weatherCard)
      })
      .catch(function (err) {
        alert(err)
        document.querySelector('#location').value = ' '
      })
  }

  function displayWeatherData(obj) {
    const card = document.querySelector('.card')
    const title = document.querySelector('#title')
    const date = document.querySelector('#date')
    const temp = document.querySelector('#num')
    const unit = document.querySelector('#celsius')
    const icon = document.querySelector('#icon img')
    const sky = document.querySelector('#sky')
    const feels_like = document.querySelector('#infos #feels-like')
    const humidity = document.querySelector('#infos #humidity')
    const wind = document.querySelector('#infos #wind')
    title.textContent = obj.name
    date.textContent = new Date(Date.now()).toLocaleDateString()
    temp.textContent = Math.floor(obj.temp)
    unit.textContent = '°C'
    icon.src = obj.iconUrl
    sky.textContent = obj.sky
    feels_like.textContent = 'Feels like: ' + Math.floor(obj.feels) + ' °C'
    humidity.textContent = 'Humidity: ' + obj.humidity
    wind.textContent = 'Wind: ' + obj.wind + ' km/h'

    card.classList.add('show')
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
