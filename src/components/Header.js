import Inferno from 'inferno';

import Logo from './Logo';

const Header = ({year, minusYear, plusYear}) => (
  <header>
    <Logo/><br/>
    <div id="year-minus" onClick={minusYear}></div>
    <span>{year}</span>
    <div id="year-plus" onClick={plusYear}></div>
  </header>
)

export default Header;