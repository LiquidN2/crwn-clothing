import type { ShopItem } from '../../models/ShopItem';
import type { CartItem } from './cart.slice';

export const addItemToCart = (
  itemToAdd: ShopItem,
  cart: CartItem[]
): CartItem[] => {
  // Cart is empty, add shop item and set qty to 1 and total to the price
  if (cart.length === 0) {
    return [{ ...itemToAdd, quantity: 1, total: itemToAdd.price }];
  }

  // Look up item to be added in cart
  const existingCartItem = cart.find(
    (item: CartItem) => item.id === itemToAdd.id
  );

  // If item does not exist in cart, add to cart with qty as 1 and total as price
  if (!existingCartItem) {
    return [...cart, { ...itemToAdd, quantity: 1, total: itemToAdd.price }];
  }

  // If item exists in cart, update qty and total
  return cart.map((item: CartItem) => {
    if (item.id === existingCartItem.id) {
      return {
        ...item,
        quantity: item.quantity + 1,
        total: item.total + item.price,
      };
    }

    return item;
  });
};

export const removeItemFromCart = (
  itemIdToRemove: CartItem['id'],
  cart: CartItem[]
): CartItem[] => {
  if (cart.length === 0) throw Error('Cart is empty');

  return cart.filter(item => item.id !== itemIdToRemove);
};

export const changeItemQuantityInCart = (
  itemId: CartItem['id'],
  cart: CartItem[],
  changeQtyBy: number
): CartItem[] => {
  const itemToChange = cart.find(item => item.id === itemId);

  if (!itemToChange) return cart;

  const resultingQuantity = itemToChange.quantity + changeQtyBy;

  if (resultingQuantity < 0) throw Error('Cannot remove more than current qty');

  if (resultingQuantity === 0) {
    return removeItemFromCart(itemId, cart);
  }

  return cart.map(item => {
    if (item.id !== itemId) return item;
    return { ...item, quantity: resultingQuantity };
  });
};
