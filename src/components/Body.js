import Inferno from 'inferno';

import Month from './Month'

const Body = ({year, locale}) => {

  const nbDaysInAWeek = 7
  const dayFormatter = new Intl.DateTimeFormat(locale, {weekday: "long"})
  const monthFormatter = new Intl.DateTimeFormat(locale, {month: "long"})

  // const getNbDaysInMonth = (year, month) => {
  //   const nextMonth = month >= 11 ? 0 : month + 1 
  //   const nextMonthYear = month >= 11 ? year + 1 : year
  //   const dateObj = new Date(nextMonthYear, nextMonth, 0)
  //   return dateObj.getDate()
  // }

  // const getNbDaysInYear = (year) => {
  //   const i = 0
  //   const isDone = false
  //   const days = []
  //   while (!isDone) {
  //     const dateObj = new Date(year, 0, i)
  //     days.push({ date : dateObj.getDate(), day : dateObj.getDay(), month : dateObj.getMonth() })
  //   }
  // }

  const getFirstDayOfMonth = month  => year => {
    const dateObj = new Date(year, month, 1)
    return dateObj.getDay()
  }

  const getFirstDayOfYear = getFirstDayOfMonth(0)

  // const isDateNextYear = (year, month, date) => (currentYear) => {
  //   const dateObj = new Date(year, month, date)
  //   return parseInt(dateObj.getFullYear()) > parseInt(currentYear)
  // }

  // Return true if a date belongs to the next month (ie : returns true for 2016, 3, 34)
  const isDateNextMonth = (year, month, date) => {
    const dateObj = new Date(year, month, date)
    return  parseInt(dateObj.getFullYear()) > parseInt(year) 
            || ( 
              parseInt(dateObj.getFullYear()) === parseInt(year) 
              && parseInt(dateObj.getMonth()) > parseInt(month)
            )
  }

  const getYear = year => ({
    id: year,
    months : getMonths(year)
  })

  const getMonths = year => {
    return [0,1,2,3,4,5,6,7,8,9,10,11].map(month => getMonth(year, month))
  }

  const getMonth = (year, month) => {
    const dateObj = new Date(year, month)
    return {
      id : month,
      name: monthFormatter.format(dateObj),
      weeks : getWeeks(year, month),
      year: year
    }
  }

  const getWeeks = (year, month) => {
    let weeks = []
    let weekId = 0
    let date = 1 - getFirstDayOfMonth(month)(year)
    while (!isDateNextMonth(year, month, date) && date < 100) { // date < 100 = security to prevent infinite loops
      weeks.push(getWeek(weekId)(year, month, date))
      weekId++
      date += nbDaysInAWeek
    }
    return weeks
  }

  const getWeek = id => (year, month, startingDate) => ({
    id : id,
    days : [0,1,2,3,4,5,6].map(i => getDay(year, month, startingDate + i))
  })

  const getDay = (year, month, day) => {
    const dateObj = new Date(year, month, day)  
    return { 
      date : dateObj.getDate(), 
      id : dateObj.getDay(),
      name: dayFormatter.format(dateObj),    
      inCurrentMonth: (dateObj.getMonth() === month)
    }
  }

  const getMonthComponent = (month) => {
    return <Month name={month.name} year={month.year} weeks={month.weeks} />
  }  

  return (
    <div id="body">
      {getYear(year).months.map(month => getMonthComponent(month))}
    </div>
  )  
}

export default Body;