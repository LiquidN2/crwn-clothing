import React from 'react';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { useActions, useAppSelector } from '../../hooks';
import { AuthStatusType, selectUserStatus } from '../../redux/user';
import { selectCartHidden } from '../../redux/cart';

import {
  HeaderContainer,
  LogoContainer,
  NavContainer,
  NavItemLink,
} from './header.styles';

const Header: React.FC = () => {
  const userStatus = useAppSelector(selectUserStatus);
  const cartHidden = useAppSelector(selectCartHidden);
  const { signOutAsync } = useActions();

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>

      <NavContainer>
        <NavItemLink to="/shop">Shop</NavItemLink>
        <NavItemLink to="/contact">Contact</NavItemLink>
        {userStatus === AuthStatusType.Authenticated ? (
          <NavItemLink as="button" onClick={() => signOutAsync()}>
            Sign out
          </NavItemLink>
        ) : (
          <NavItemLink to="/signin">Sign In</NavItemLink>
        )}
        <CartIcon />
      </NavContainer>

      {!cartHidden && <CartDropDown />}
    </HeaderContainer>
  );
};

export default Header;
