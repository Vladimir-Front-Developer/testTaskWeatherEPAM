window.onload = function (){
  const weatherComponent = document.getElementById('weatherComponent')
  const backDay = document.getElementById('backDay')
  const nextDay = document.getElementById('nextDay')
  const back = document.getElementById('back')
  const next = document.getElementById('next')

  const weatherList = new WeatherList()
  const config = new Config()
  const dataWeathers = config.getWeather()

  const date = new Date()
  let today = date.getTime()
  dataWeathers.forEach(el => {
    el.date = today
    today += 86400000
  })

  let beginDays = 0
  let endDays = 4
  const getFourDays = (begin, end, arr) => { return arr.slice(begin, end) }
  let fourDaysData = getFourDays(beginDays, endDays, dataWeathers)

  weatherList.setData(fourDaysData)
  let weatherListEl = weatherList.getElem()
  weatherComponent.insertBefore(weatherListEl, weatherComponent.children[1])

  const redrawList = () => {
    weatherList.setData(fourDaysData)
    weatherListEl = weatherList.getElem()
    weatherComponent.children[1].remove()
    weatherComponent.insertBefore(weatherListEl, weatherComponent.children[1])
  }
  
  backDay.onclick = () => {
    if(beginDays > 0){
      next.style.borderColor="#000"
      beginDays--
      endDays--
      fourDaysData = getFourDays(beginDays, endDays, dataWeathers)
      redrawList()
    }
    if(!beginDays) back.style.borderColor="#c2c2c2"
  }
  nextDay.onclick = () => {
    if(endDays !== dataWeathers.length){
      back.style.borderColor="#000"
      beginDays += 1
      endDays += 1
      fourDaysData = getFourDays(beginDays, endDays, dataWeathers)
      redrawList()
    }
    if(endDays === dataWeathers.length) next.style.borderColor="#c2c2c2"
  }
}