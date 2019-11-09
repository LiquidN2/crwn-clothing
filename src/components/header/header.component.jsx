import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// FIREBASE AUTH
import { auth } from 'firebase/firebase.utils';

// CHILD COMPONENTS
import CartIcon from 'components/cart-icon/cart-icon.component';
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component';

// REDUX SELECTORS
import { selectCurrentUser } from 'redux/user/user.selectors';
import { selectCartHidden } from 'redux/cart/cart.selectors';

import { hideCart } from 'redux/cart/cart.actions';

// STYLES
import { ReactComponent as Logo } from 'assets/crown.svg';
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from './header.styles';

// const Header = ({ currentUser, cartDropDownHidden }) => (
//   <div className="header">
//     <Link className="logo-container" to="/">
//       <Logo className="logo" />
//     </Link>

//     <div className="options">
//       <Link className="option" to="/shop">
//         SHOP
//       </Link>

//       <Link className="option" to="/contact">
//         CONTACT
//       </Link>

//       {currentUser ? (
//         <div className="option" onClick={() => auth.signOut()}>
//           SIGN OUT
//         </div>
//       ) : (
//         <Link className="option" to="/signin">
//           SIGN IN
//         </Link>
//       )}

//       <CartIcon />
//     </div>

//     {!cartDropDownHidden ? <CartDropdown /> : null}
//   </div>
// );

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.node = null;

    this.nodeRef = element => {
      this.node = element;
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClickOutside = event => {
    this.props.hideCart();
  };

  handleClick = event => {
    if (this.node.contains(event.target)) return;

    this.handleClickOutside();
  };

  render() {
    return (
      <HeaderContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>

        <OptionsContainer>
          <OptionLink to="/shop">SHOP</OptionLink>

          <OptionLink to="/contact">CONTACT</OptionLink>

          {this.props.currentUser ? (
            <OptionLink as="div" onClick={() => auth.signOut()}>
              SIGN OUT
            </OptionLink>
          ) : (
            <OptionLink to="/signin">SIGN IN</OptionLink>
          )}

          <div ref={this.nodeRef}>
            <CartIcon />
            {!this.props.cartDropDownHidden ? <CartDropdown /> : null}
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
};

// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   cartDropDownHidden: selectCartHidden(state),
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartDropDownHidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
  hideCart: () => dispatch(hideCart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
