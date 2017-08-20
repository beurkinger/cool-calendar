import style from '../css/style.css'

import Inferno from 'inferno'
import Component from 'inferno-component'

import Header from './Header';
import Body from './Body'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {year : 2016, locale : 'en-US'}    
    this.updateYear = this.updateYear.bind(this)
  }

  updateYear (i) {
    this.setState({year : this.state.year + i})
  }

	render () {
    return (
      <div id="app">
        <Header year={this.state.year}
                minusYear={e => this.updateYear(-1)} 
                plusYear={e => this.updateYear(1)}
                />
        <Body year={this.state.year} locale={this.state.locale} />
      </div>
    )
	}
}

export default App
