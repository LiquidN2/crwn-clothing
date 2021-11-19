import './checkout-item.styles.scss';
import React, { MouseEventHandler } from 'react';
import type { CartItem } from '../../redux/cart/cart.reducer';

import { useActions } from '../../hooks';

interface CheckoutItemProps extends CartItem {}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  id,
  name,
  imageUrl,
  quantity,
  price,
}) => {
  const { removeItem, changeItemQuantity } = useActions();

  const handleIncreaseQty: MouseEventHandler<HTMLDivElement> = () =>
    changeItemQuantity(id, 1);

  const handleDecreaseQty: MouseEventHandler<HTMLDivElement> = () =>
    changeItemQuantity(id, -1);

  const handleRemoveItem: MouseEventHandler<HTMLDivElement> = () =>
    removeItem(id);

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecreaseQty}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncreaseQty}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={handleRemoveItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
