import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// COMPONENTS
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

// REDUX SELECTORS
import { selectCartItems } from '../../redux/cart/cart.selectors';

// STYLES
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map(cartItem => {
          return <CartItem key={cartItem.id} item={cartItem} />;
        })}
      </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
};

CartDropdown.propTypes = {
  cartItems: PropTypes.array,
};

// const mapStateToProps = state => ({
//   cartItems: selectCartItems(state),
// });
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
