import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleCartDisplay } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartDisplay }) => (
  <div className="cart-icon">
    <ShoppingIcon className="shopping-icon" onClick={toggleCartDisplay} />
    <span className="item-count">0</span>
  </div>
);

CartIcon.propTypes = {
  toggleCartDisplay: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  toggleCartDisplay: () => dispatch(toggleCartDisplay()),
});

export default connect(
  null,
  mapDispatchToProps
)(CartIcon);
