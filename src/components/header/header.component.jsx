import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// CHILD COMPONENTS
import CartIcon from 'components/cart-icon/cart-icon.component';
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component';

// REDUX SELECTORS
import { selectCurrentUser } from 'redux/user/user.selectors';
import { selectCartHidden } from 'redux/cart/cart.selectors';

// REDUX ACTIONS
import { hideCart } from 'redux/cart/cart.actions';
import { signOutStart } from 'redux/user/user.actions';

// STYLES
import { ReactComponent as Logo } from 'assets/crown.svg';
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from './header.styles';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;

    this.nodeRef = element => {
      this.node = element;
    };
  }

  handleClickOutside = () => {
    this.props.hideCart();
  };

  handleClick = event => {
    if (this.node.contains(event.target)) return;

    this.handleClickOutside();
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  render() {
    const { currentUser, cartDropDownHidden, signOutStart } = this.props;
    return (
      <HeaderContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>

        <OptionsContainer>
          <OptionLink to="/shop">SHOP</OptionLink>

          <OptionLink to="/contact">CONTACT</OptionLink>

          {currentUser ? (
            <OptionLink as="div" to="/" onClick={signOutStart}>
              SIGN OUT
            </OptionLink>
          ) : (
            <OptionLink to="/signin">SIGN IN</OptionLink>
          )}

          <div ref={this.nodeRef}>
            <CartIcon />
            {!cartDropDownHidden ? <CartDropdown /> : null}
          </div>
        </OptionsContainer>
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
  cartDropDownHidden: PropTypes.bool,
  hideCart: PropTypes.func,
  signOutStart: PropTypes.func,
};

// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   cartDropDownHidden: selectCartHidden(state),
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartDropDownHidden: selectCartHidden,
});

const mapDispatchToProps = {
  hideCart,
  signOutStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
