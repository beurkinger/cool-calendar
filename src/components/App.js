import Inferno from 'inferno'
import Component from 'inferno-component'

import Month from './Month'

const nbDaysInAWeek = 7
const locale = "fr-fr"

// const getNbDaysInMonth = (year, month) => {
//   const nextMonth = month >= 11 ? 0 : month + 1 
//   const nextMonthYear = month >= 11 ? year + 1 : year
//   const dateObj = new Date(nextMonthYear, nextMonth, 0)
//   return dateObj.getDate()
// }

const getNbDaysInYear = (year) => {
  const i = 0
  const isDone = false
  const days = []
  while (!isDone) {
    const dateObj = new Date(year, 0, i)
    days.push({ date : dateObj.getDate(), day : dateObj.getDay(), month : dateObj.getMonth() })
  }
}

const getFirstDay = (year, month) => {
  const dateObj = new Date(year, month, 1)
  return dateObj.getDay()
}

const getFirstDayOfYear = year => getFirstDay(year, 0)
const getFirstDayOfMonth = year => month => getFirstDay(year, month)

// const isDateNextYear = (year, month, date) => (currentYear) => {
//   const dateObj = new Date(year, month, date)
//   return parseInt(dateObj.getFullYear()) > parseInt(currentYear)
// }

const isDateNextMonth = (year, month, date) => {
  const dateObj = new Date(year, month, date)
  return parseInt(dateObj.getFullYear()) > parseInt(year) 
          || ( 
            parseInt(dateObj.getFullYear()) === parseInt(year) 
            && parseInt(dateObj.getMonth()) > parseInt(month)
          )
}

const getYear = year => {
  return [0,1,2,3,4,5,6,7,8,9,10,11].map(month => { 
    const dateObj = new Date(year, month)
    return {
      id : month,
      name: dateObj.toLocaleString( locale, { month : "long" }),
      weeks : getWeeks(year, month)
    }
  })
}

const getWeeks = (year, month) => {
  let weeks = []
  let weekId = 0;
  let date = 1 - getFirstDayOfMonth(year)(month)
  while (true && date < 100) { // date < 500 = security to prevent infinite loops
    if (isDateNextMonth(year, month, date)) break
    weeks.push(getWeek(weekId)(year, month, date))
    weekId++;
    date += nbDaysInAWeek
  }
  return weeks
}

const getWeek = id => (year, month, startingDate) => {
  let days = []
  for (let i = 0; i < nbDaysInAWeek; i ++) {
    days.push(getDay(year, month, startingDate + i))
  }
  return {
    id : id,
    days : days
  }
}

const getDay = (year, month, day) => {
  const dateObj = new Date(year, month, day)  
  return { 
    date : dateObj.getDate(), 
    id : dateObj.getDay(),
    name: dateObj.toLocaleString( locale, { weekday : "long" }),
    inCurrentMonth: (dateObj.getMonth() === month)
  }
}


class App extends Component {

  getMonthComponent (month) {
    return <Month month={month} />
  }  

	render () {
    
    const year = getYear(2016)
    console.log(year)
    return 'COOL CALENDAR';

    const data = getMonths(2017)    
    return <div id="app">{data.map(this.getMonthComponent)}</div>
	}
}

export default App
