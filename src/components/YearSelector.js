import Inferno from 'inferno';

const YearSelector = ({year, minusYear, plusYear, setYear}) => {
  console.log(year)
  const handleEvents = (e, fn) => {
    e.preventDefault()
    fn()
  }

  const handleInput = e => {
    e.preventDefault()    
    const value = parseInt(e.target.value);
    const newValue = !isNaN(value) && value !== year && value >= 100 && value <= 10000 ? value : year;
    setYear(newValue);
  }

  return (
    <div id="year-selector">
        <button id="year-minus" onClick={ e => handleEvents(e, minusYear) }></button>
        <input id="year-input" value={year} onChange={handleInput} />
        <button id="year-plus" onClick={ e => handleEvents(e, plusYear) }></button>
    </div>
  )
}

export default YearSelector;