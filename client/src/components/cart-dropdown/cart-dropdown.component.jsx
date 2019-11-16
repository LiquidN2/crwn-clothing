import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// COMPONENTS
import CustomButton from 'components/custom-button/custom-button.component';
import CartItem from 'components/cart-item/cart-item.component';

// REDUX SELECTORS
import { selectCartItems } from 'redux/cart/cart.selectors';

// REDUX ACTIONS
import { hideCart } from 'redux/cart/cart.actions';

// STYLES
import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, history, hideCart }) => {
  const handleCheckOutBtnClick = () => {
    history.push('/checkout');
    hideCart();
  };

  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length > 0 ? (
          cartItems.map(cartItem => {
            return <CartItem key={cartItem.id} item={cartItem} />;
          })
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItemsContainer>
      <CustomButton onClick={handleCheckOutBtnClick}>
        GO TO CHECKOUT
      </CustomButton>
    </CartDropdownContainer>
  );
};

CartDropdown.propTypes = {
  cartItems: PropTypes.array,
  history: PropTypes.object,
  hideCart: PropTypes.func,
};

// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state),
// });
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = dispatch => ({
  hideCart: () => dispatch(hideCart()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartDropdown)
);
