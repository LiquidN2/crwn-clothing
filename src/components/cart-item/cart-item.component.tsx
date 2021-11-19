import './cart-item.styles.scss';
import React from 'react';
import type { CartItem as CartItemType } from '../../redux/cart/cart.reducer';

export interface CartItemProps extends CartItemType {}

const CartItem: React.FC<CartItemProps> = ({
  name,
  imageUrl,
  price,
  quantity,
}) => {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} className="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
