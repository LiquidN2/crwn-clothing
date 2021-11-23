import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

export const HeaderContainer = styled.header`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
  position: relative;
`;

export const LogoContainer = styled(Link)`
  padding: 25px 0;
`;

export const NavContainer = styled.nav`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavItemLink = styled(NavLink)`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  font-family: inherit;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.2s;
  text-transform: uppercase;
  margin-right: 30px;
  padding: 10px 0;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
  }

  &.active {
    border-bottom: 2px solid black;
  }
`;
