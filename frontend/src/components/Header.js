import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {

  return (
    <>
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
        <div className='header__user-information'>
          <p className='header__email'>{props.loginEmail}</p>
          <Routes>
            <Route path="/sign-in" element={<Link to="/sign-up" className='header__link'>Регистрация</Link>} />
            <Route path="/sign-up" element={<Link to="/sign-in" className='header__link'>Войти</Link>} />
            <Route path="/" element={<Link to="/sign-in" onClick={props.onSignOut} className='header__link'>Выйти</Link>} />
          </Routes>
        </div>
      </header>
      <div className="header__line"></div>
    </>
  )
}

export default Header;