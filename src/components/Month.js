import Inferno from 'inferno';

const getHeaderRow = week => <thead>{week.days.map(getHeaderCell)}</thead>
const getWeekRow = week => <tr>{week.days.map(getDateCell)}</tr>
const getHeaderCell = day => <th>{day.name.slice(0, 2)}</th>;
const getDateCell = day => <td class={day.inCurrentMonth ? '' : 'muted'}>{day.date}</td>;

// const formatDateNbr = i => i < 10 ? '0' + i : i

const Month = props => {
    return (
        <table class="month">
            <caption>{props.month.name}</caption> 
            {getHeaderRow(props.month.weeks[0])}
            {props.month.weeks.map(getWeekRow)}
        </table>
    )
}

export default Month;