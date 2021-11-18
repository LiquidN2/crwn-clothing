import './header.styles.scss';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserDoc } from '../../models/User';
import { signOutAsync } from '../../firebase/firebase.auth';

import { ReactComponent as Logo } from '../../assets/crown.svg';

interface HeaderProps {
  currentUser: UserDoc | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav__link nav__link--active' : 'nav__link';

  return (
    <header className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <nav className="nav">
        <NavLink to="/shop" className={navLinkClass}>
          Shop
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
        {currentUser ? (
          <button className="nav__link" onClick={() => signOutAsync()}>
            Sign out
          </button>
        ) : (
          <NavLink to="/signin" className={navLinkClass}>
            Sign In
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
