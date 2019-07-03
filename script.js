var dataWeathers = [
  {
    date: 1538337600000,
    temperature: {
      night: -3,
      day: 2,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    date: 1538424000000,
    temperature: {
      night: 0,
      day: 4,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: true,
  },
  {
    date: 1538510400000,
    temperature: {
      night: 0,
      day: 1,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: true,
  },
  {
    date: 1562263449000,
    temperature: {
      night: 0,
      day: 1,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: true,
  },
]
window.onload = function (){
  const weatherComponent = document.getElementById('weatherComponent')
  const weatherList = new WeatherList(dataWeathers)
  const el = weatherList.getElem()
  console.log(el)
  weatherComponent.insertBefore(el, weatherComponent.children[1])
}

class WeatherList {
	constructor(data){
		this.data = data.map((el) => {
      let precipitation = 'без осадков'
      if(el.snow && el.rain) precipitation = 'дождь со снегом'
      else if(el.snow) precipitation = 'снег'
      else if(el.rain) precipitation = 'дождь'
      const unicTemp = "\U+00B0"
      return {
        dayWeek: this.dateConversion(el.date).weekDay,
        date: this.dateConversion(el.date).ddmn,
        temperature: {
          day: `днем ${el.temperature.day}${unicTemp}`,
          night: `ночью ${el.temperature.night}${unicTemp}`,
        },
        precipitation: precipitation
      }
    })
	}
  getElem(){
    return this.render()
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
    el.innerText = val
    return el
  }
  renderItemsValue(li, item){
    li.appendChild(this.createElem('dayWeek', 'p', item.dayWeek))
    li.appendChild(this.createElem('date', 'p', item.date))
    // li.appendChild(this.createElem('weatherIcon', 'img'))
    li.appendChild(this.createElem('dayTemperature', 'p', item.temperature.day))
    li.appendChild(this.createElem('nightTemperature', 'p', item.temperature.night))
    li.appendChild(this.createElem('precipitation', 'p', item.precipitation))
    return li
  }
  dateConversion(date) {
    let dateObj
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const month = [ 'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Ноября', 'Декабря' ]
    if (typeof date === 'string') dateObj = new Date(date)
    if (typeof date === 'number') dateObj = new Date(date)
    const twoChart = number => {
    if (number < 10) return `0${number}`
      return number
    }
    const resultObj = {
      dd: twoChart(dateObj.getDate()),
      mn: dateObj.getMonth()
    }
    return {
      weekDay: days[dateObj.getDay()],
      ddmn: `${resultObj.dd} ${month[resultObj.mn]}`
    }
  }

}