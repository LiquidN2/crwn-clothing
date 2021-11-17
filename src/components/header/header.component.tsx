import './header.styles.scss';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const NAV_ITEMS: { title: string; url: string }[] = [
  { title: 'shop', url: 'shop' },
  { title: 'contact', url: 'contact' },
  { title: 'sign in', url: 'signin' },
];

const Header: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav__link nav__link--active' : 'nav__link';

  return (
    <header className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <nav className="nav">
        {NAV_ITEMS.map((link, index) => (
          <NavLink key={index} className={navLinkClass} to={`/${link.url}`}>
            {link.title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
