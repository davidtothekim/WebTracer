// Styles
import './header.scss';

// Assets
import logoIcon from '../../assets/logo-icon.svg';

function Header() {
	return (
		<header className="header">
			<img className="header__logo" src={logoIcon} alt="logo" />
			<h1 className="header__title">WebTracer</h1>
		</header>
	);
}

export default Header;
