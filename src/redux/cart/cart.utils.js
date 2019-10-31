/**
 * If an item object to be added exists in the array, update the quantity of the object in the array
 * If the item does not exist in the array, add it to the array and give the quantity property of 1
 * @param  {array}   cartItems      array of cart item objects
 * @param  {object}  cartItemToAdd  cart item object
 * @return {array}                  the updated array of item objects
 */
export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem => {
      if (cartItem.id === cartItemToAdd.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }

      return cartItem;
    });
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, itemId) => {
  // if id matches, decrease qty by 1
  const updatedCartItems = cartItems.map(cartItem => {
    if (cartItem.id === itemId && cartItem.quantity > 0) {
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    }
    return cartItem;
  });

  // remove any item from array whose qty is 0
  return updatedCartItems.filter(item => item.quantity !== 0);
};

/**
 * Remove item object from array based on id
 * @param  {array}   cartItems  array of cart item objects
 * @param  {number}  itemId     item id
 * @return {array}              the updated array of item objects
 */
export const clearItemFromCart = (cartItems, itemId) => {
  return cartItems.filter(cartItem => {
    return cartItem.id !== itemId;
  });
};
