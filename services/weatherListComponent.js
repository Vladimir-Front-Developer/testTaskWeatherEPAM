class WeatherList {
  setData(data){
    this.data = data
    this.dataMaping()
  }
  
  getElem(){
    return this.render()
  }

  dataMaping(){
    this.data = this.data.map((el) => {
      let precipitation = this.getWeatherIcon(el.cloudiness, el.snow, el.rain).precipitation
      let weatherIcon = this.getWeatherIcon(el.cloudiness, el.snow, el.rain).weatherIcon
      let day = el.temperature.day 
      let night = el.temperature.night
      day = day > 0 ? `+${day}`:`${day}`
      night = night > 0 ? `+${night}`:`${night}`
      let dayWeek
      if(this.dateConversion(el.date).weekDay === this.dateConversion(new Date()).weekDay) dayWeek = 'Сегодня'
      else dayWeek = this.dateConversion(el.date).weekDay
      return {
        dayWeek: dayWeek,
        date: this.dateConversion(el.date).ddmn,
        weatherIcon: weatherIcon,
        temperature: {
          day: `днем ${day}°`,
          night: `ночью ${night}°`,
        },
        precipitation: precipitation
      }
    })
  }

  render(){
    this.list = document.createElement('ol')
    this.list.className = 'weatherList'
    this.renderItems(this.data)
    return this.list
  }

  renderItems(data){
    for (let itemVal of data) {
      let li = document.createElement('li')
      li.className = 'weatherItem'
      li = this.renderItemsValue(li, itemVal)
      this.list.appendChild(li)
    }
  }

  createElem(className, tag, val){
    let el = document.createElement(tag)
    el.className = className
    if(tag === 'img'){
      el.src = 'assets/' + val
      return el
    }
    el.innerText = val
    return el
  }

  renderItemsValue(li, item){
    li.appendChild(this.createElem('dayWeek', 'p', item.dayWeek))
    li.appendChild(this.createElem('date', 'p', item.date))
    li.appendChild(this.createElem('weatherIcon', 'img', item.weatherIcon))
    li.appendChild(this.createElem('dayTemperature', 'p', item.temperature.day))
    li.appendChild(this.createElem('nightTemperature', 'p', item.temperature.night))
    li.appendChild(this.createElem('precipitation', 'p', item.precipitation))
    return li
  }

  getWeatherIcon(cloudiness, snow, rain){
      let weatherIcon = 'weather-sunny.png'
      let precipitation = 'без осадков'
      if(snow && rain){
        weatherIcon = 'weather-snowy-rainy.png'
        precipitation = 'дождь со снегом'
      }
      else if(snow){
        weatherIcon = 'weather-snowy.png'
        precipitation = 'снег'
      }
      else if(rain){
        weatherIcon = 'weather-rainy.png'
        precipitation = 'дождь'
      }
      else if(cloudiness === 'Облачно'){
        weatherIcon = 'weather-cloudy.png'
      }
      return {
        precipitation,
        weatherIcon
      }
  }

  dateConversion(date) {
    let dateObj = date
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const month = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'ноября', 'декабря' ]
    if (typeof date === 'string') dateObj = new Date(date)
    if (typeof date === 'number') dateObj = new Date(date)
    // const twoChart = number => {
    //   if (number < 10) return `0${number}`
    //   return number
    // }
    const resultObj = {
      dd: dateObj.getDate(),
      mn: dateObj.getMonth()
    }
    return {
      weekDay: days[dateObj.getDay()],
      ddmn: `${resultObj.dd} ${month[resultObj.mn]}`
    }
  }
}