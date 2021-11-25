import React, { MouseEventHandler } from 'react';
import type { CartItem } from '../../redux/cart/cart.slice';

import { useActions } from '../../hooks';
import {
  CheckoutItemContainer,
  CheckoutItemImageContainer,
  CheckoutItemName,
  CheckoutItemPrice,
  CheckoutItemQty,
  Arrow,
  QtyValue,
  RemoveButton,
} from './checkout-item.styles';

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
    changeItemQuantity({ itemId: id, changeQtyBy: 1 });

  const handleDecreaseQty: MouseEventHandler<HTMLDivElement> = () =>
    changeItemQuantity({ itemId: id, changeQtyBy: -1 });

  const handleRemoveItem: MouseEventHandler<HTMLDivElement> = () =>
    removeItem(id);

  return (
    <CheckoutItemContainer>
      <CheckoutItemImageContainer>
        <img src={imageUrl} alt={name} />
      </CheckoutItemImageContainer>
      <CheckoutItemName>{name}</CheckoutItemName>
      <CheckoutItemQty>
        <Arrow onClick={handleDecreaseQty}>&#10094;</Arrow>
        <QtyValue>{quantity}</QtyValue>
        <Arrow onClick={handleIncreaseQty}>&#10095;</Arrow>
      </CheckoutItemQty>
      <CheckoutItemPrice>${price}</CheckoutItemPrice>
      <RemoveButton onClick={handleRemoveItem}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
