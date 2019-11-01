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

// STYLES
import { ReactComponent as Logo } from 'assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser, cartDropDownHidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {!cartDropDownHidden ? <CartDropdown /> : null}
  </div>
);

Header.propTypes = {
  currentUser: PropTypes.object,
  cartDropDownHidden: PropTypes.bool,
};

// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   cartDropDownHidden: selectCartHidden(state),
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartDropDownHidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
