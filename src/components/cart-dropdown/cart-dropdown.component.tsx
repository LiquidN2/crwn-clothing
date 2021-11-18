import './cart-dropdown.styles.scss';
import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

const CartDropDown: React.FC = () => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items" />
      <CustomButton type="button">Go to Checkout</CustomButton>
    </div>
  );
};

export default CartDropDown;
