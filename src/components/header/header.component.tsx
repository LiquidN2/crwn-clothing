import './header.styles.scss';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOutAsync } from '../../firebase/firebase.auth';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { useAppSelector } from '../../hooks';

const Header: React.FC = () => {
  const { currentUser, hiddenCart } = useAppSelector(state => ({
    currentUser: state.user.currentUser,
    hiddenCart: state.cart.hidden,
  }));

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
        <CartIcon />
      </nav>
      {!hiddenCart && <CartDropDown />}
    </header>
  );
};

export default Header;
