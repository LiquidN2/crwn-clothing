import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// REDUX ACTIONS
import { toggleCartDisplay } from 'redux/cart/cart.actions';

// REDUX SELECTORS
import { selectCartItemsCount } from 'redux/cart/cart.selectors';

// STYLES
import {
  CartIconContainer,
  StyledShoppingIcon,
  ItemCount,
} from './cart-icon.styles';

const CartIcon = ({ toggleCartDisplay, itemCount }) => {
  return (
    <CartIconContainer onClick={toggleCartDisplay}>
      <StyledShoppingIcon />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  );
};

CartIcon.propTypes = {
  itemCount: PropTypes.number,
  toggleCartDisplay: PropTypes.func,
};

// const mapStateToProps = state => ({
//   itemCount: selectCartItemsCount(state),
// });
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

const mapDispatchToProps = dispatch => ({
  toggleCartDisplay: () => dispatch(toggleCartDisplay()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
