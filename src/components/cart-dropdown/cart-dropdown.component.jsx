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
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, hideCart }) => {
  const handleCheckOutBtnClick = () => {
    history.push('/checkout');
    hideCart();
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map(cartItem => {
            return <CartItem key={cartItem.id} item={cartItem} />;
          })
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton onClick={handleCheckOutBtnClick}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
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
