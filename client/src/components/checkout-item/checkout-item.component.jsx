import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// REDUX ACTIONS
import { clearItem, addItem, removeItem } from 'redux/cart/cart.actions';

// STYLES
import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Price,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-iten.styles';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={cartItem.imageUrl} alt="item" />
      </ImageContainer>
      <Name>{cartItem.name}</Name>
      <Quantity>
        <Arrow onClick={() => removeItem(cartItem.id)}>&#10094;</Arrow>
        <Value>{cartItem.quantity}</Value>
        <Arrow onClick={() => addItem(cartItem)}>&#10095;</Arrow>
      </Quantity>
      <Price>${cartItem.price}</Price>
      <RemoveButton onClick={() => clearItem(cartItem.id)}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

CheckoutItem.propTypes = {
  cartItem: PropTypes.object,
  clearItem: PropTypes.func,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: itemId => dispatch(removeItem(itemId)),
  clearItem: itemId => dispatch(clearItem(itemId)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
