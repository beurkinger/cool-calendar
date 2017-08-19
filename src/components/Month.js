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
        this.getWeekCell = this.getWeekCell.bind(this)
        this.handleHover = this.handleHover.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
    }
    
    // getTitleRow (monthName) {
    //     return <tr><th colSpan={nbDaysInWeek}>{monthName}</th></tr>
    // }
    getCaption (monthName, year) {
        return (
            <caption>
                {monthName} <span>{year}</span>
            </caption>
        )
    }
    getHeaderRow (week) {
        return <tr>{week[0].days.map(this.getHeaderCell)}</tr>
    }
    getWeekRow (week) {
        return <tr>{week.days.map(this.getWeekCell)}</tr>
    }
    getHeaderCell (day) {
        return <th>{day.name.slice(0, 2)}</th>
    }
    getWeekCell (day) {
        return (
            <td class={day.inCurrentMonth ? '' : 'muted'} 
                onmouseover={e => day.inCurrentMonth ? this.handleHover(day) : this.handleLeave()} 
                >
                {day.date}
            </td>
        )
    }

    getDateDetails (date) {
        return <tr><th colspan={nbDaysInWeek}>{date.name} {date.date}</th></tr>
    }

    getHeader (weeks, selectedDay) {
        return (
            <thead>
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

    handleHover (day) {
        this.setState({selectedDay : day});
    }

    handleLeave (day) {
        this.setState({selectedDay : null});
    }

    render () {
        console.log(this.props);
        return (
            <table class="month" onmouseleave={this.handleLeave}>
                {this.getCaption(this.props.name, this.props.year)}
                {this.getHeader(this.props.weeks, this.state.selectedDay)}
                {this.getBody(this.props.weeks)}
            </table>
        )
    }
}

export default Month;