import Inferno from 'inferno';

import Logo from './Logo';
import YearSelector from './YearSelector';

const Header = ({year, minusYear, plusYear, setYear}) => (
  <header>
    <Logo/>
    <YearSelector year={year} minusYear={minusYear} plusYear={plusYear} setYear={setYear} />
  </header>
)

export default Header;