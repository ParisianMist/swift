import './Header.scss';

//icon
import logoutIcon from '../../assets/icons/logout_icon.svg';
import logo from '../../assets/logo/swift_logo-white.png'
const Header = ({ name, logout }) => {
    return (
        <header className='header'>
            {/* logo */}
            <img src={logo} alt="swift logo" className="header__logo" />

            {/* logout and name */}
            <div className="header__container">
                <p className="header__person">
                    {name}
                </p>
                <img src={logoutIcon} alt="logout icon" className="header__logout"
                    onClick={logout}
                />
            </div>
        </header>
    );
};

export default Header;