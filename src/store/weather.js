class Weather {
  constructor (date, temp, icon) {
    this.date = date.toLocaleString("ru", {year: 'numeric', month: 'numeric', day: 'numeric',})
    this.temp = temp
    this.icon = icon
  }
}
export default {
  state: {
    weather: []
  },
  mutations: {
    loadWeather (state, payload) {
      state.weather = payload
    },
  },
  actions: {
    fetchWeather ({commit}) {
      const currentDate = new Date()
      currentDate.setHours(23, 59, 59)
      const dayOne = new Date();
      dayOne.setDate(dayOne.getDate() + 1)
      const dayTwo = new Date();
      dayTwo.setDate(dayTwo.getDate() + 2)
      const dayThree = new Date();
      dayThree.setDate(dayThree.getDate() + 3)
      const rawData = {
        resultWeather: [],
        averageTemps: [],
        iconsWeather: [[], [], []],
        mostIcons: [],
        days: [dayOne, dayTwo, dayThree],
        dayOneTempSum: 0,
        dayTwoTempSum: 0,
        dayThreeTempSum: 0,
      }
      fetch('https://api.openweathermap.org/data/2.5/forecast?APPID=75ed372142c5d45aaf4112ab795c0803&q=rostov-na-donu&units=metric', {method: 'GET', mode: 'cors'})
        .then(response => {
          return response.json()
        })
        .then(function(data) {
          const result = data.list.filter((date) => {
            if (new Date(date.dt_txt) >= currentDate) {
              return true
            }
          })
          result.forEach((item, index) => {
            if (index < 8) {
              rawData.dayOneTempSum += item.main.temp
              rawData.iconsWeather[0].push(item.weather[0].icon)
              return
            }
            if (index >= 8 && index < 16) {
              rawData.dayTwoTempSum += item.main.temp
              rawData.iconsWeather[1].push(item.weather[0].icon)
              return
            }
            if (index >= 16 && index < 24) {
              rawData.dayThreeTempSum += item.main.temp
              rawData.iconsWeather[2].push(item.weather[0].icon)
              return
            }
            rawData.averageTemps = [Math.round(rawData.dayOneTempSum/8), Math.round(rawData.dayTwoTempSum/8), Math.round(rawData.dayThreeTempSum/8)]
          });
          commit('loadWeather', rawData.resultWeather)
          rawData.iconsWeather.forEach((element, index) => {
            const newArr = element.slice().sort();
            let most = [undefined, 0];
            let counter = 0;
            newArr.reduce(function(old, chr){
              old == chr ? ++counter > most[1] && (most = [chr, counter]) : (counter = 1)
              return chr
            });
            rawData.mostIcons[index] = most[0]
          })
          for (let i = 0; i < 3; i++) {
            rawData.resultWeather.push(new Weather(rawData.days[i], rawData.averageTemps[i], rawData.mostIcons[i]))
          }
        })
    }
  },
  getters: {
    weather (state) {
      return state.weather
    }
  }
}
