import Inferno from 'inferno';

const getTableRow = (days, start, getCellFn) => {
    const week = days.slice(start, start + 7);
    return <div>{week.map(getCellFn)}</div>
};

const getHeaderCell = day => <span style={{margin: '5px'}}>{day.name.slice(0, 2)}</span>;
const getDateCell = day => <span style={{margin: '5px'}}>{day.date}</span>;

const getHeaderRow = days => getTableRow(days, 0, getHeaderCell);
const getWeekRow = (days, start) => getTableRow(days, start, getDateCell);

const Month = props => {
    return (
        <div class="month">
            <div class="month-name">{props.month.name}</div> 
            {getHeaderRow(props.month.days)}
            {getWeekRow(props.month.days, 0)}
            {getWeekRow(props.month.days, 7)}
            {getWeekRow(props.month.days, 14)}
            {getWeekRow(props.month.days, 21)}
            {getWeekRow(props.month.days, 28)}
            {getWeekRow(props.month.days, 35)}
        </div>
    )
}

export default Month;