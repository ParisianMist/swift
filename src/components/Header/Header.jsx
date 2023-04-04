import './Header.scss';

//icon
import logoutIcon from '../../assets/icons/logout_icon.svg';

const Header = () => {
    return (
        <header className='header'>
            {/* logo */}
                <img src="" alt="swift logo" className="header__logo" />

            {/* logout and name */}
            <div className="header__container">
                <p className="header__person">
                    Minerva McGonagal
                </p>
                <img src={logoutIcon} alt="logout icon" className="header__logout" />
            </div>
        </header>
    );
};

export default Header;