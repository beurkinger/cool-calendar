import Inferno from 'inferno';
import Component from 'inferno-component'

// const formatDateNbr = i => i < 10 ? '0' + i : i

const nbDaysInWeek = 7;

class Month extends Component {

    constructor (props) {
        super(props)
        this.state = {selectedDay : null}
        this.getHeaderRow = this.getHeaderRow.bind(this)
        this.getWeekRow = this.getWeekRow.bind(this)
        this.getHeaderCell = this.getHeaderCell.bind(this)
        this.getDateCell = this.getDateCell.bind(this)
        this.handleOver = this.handleOver.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
    }
    
    getTitleRow (monthName) {
        return <tr><th colSpan={nbDaysInWeek}>{monthName}</th></tr>
    }
    getHeaderRow (week) {
        return <tr>{week[0].days.map(this.getHeaderCell)}</tr>
    }
    getWeekRow (week) {
        return <tr>{week.days.map(this.getDateCell)}</tr>
    }
    getHeaderCell (day) {
        return <th>{day.name.slice(0, 2)}</th>
    }
    getDateCell (day) {
        return (
            <td class={day.inCurrentMonth ? '' : 'muted'} 
                onmouseover={e => day.inCurrentMonth ? this.handleOver(day) : this.handleLeave()} 
                >
                {day.date}
            </td>
        )
    }

    getDateDetails (date) {
        return <tr><th colspan={nbDaysInWeek}>{date.name} {date.date}</th></tr>
    }

    getHeader (weeks, monthName, selectedDay) {
        return (
            <thead>
                {this.getTitleRow(monthName)}
                {selectedDay ? this.getDateDetails(selectedDay) : this.getHeaderRow(weeks)}
            </thead>
        )
    }

    getBody (weeks) {
        return (
            <tbody>
                {weeks.map(this.getWeekRow)}
            </tbody>
        )
    }

    handleOver (day) {
        this.setState({selectedDay : day});
    }

    handleLeave (day) {
        this.setState({selectedDay : null});
    }

    render () {
        return (
            <table class="month" onmouseleave={this.handleLeave}>
                {this.getHeader(this.props.month.weeks, this.props.month.name, this.state.selectedDay)}
                {this.getBody(this.props.month.weeks)}
            </table>
        )
    }
}

export default Month;