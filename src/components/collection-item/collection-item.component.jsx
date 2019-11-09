import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CustomButton from 'components/custom-button/custom-button.component';

// REDUX ACTIONS
import { addItem } from 'redux/cart/cart.actions';

// STYLES
import {
  CollectionItemContainer,
  ItemImage,
  CollectionFooter,
  ItemName,
  ItemPrice,
} from './collection-item.styles';

const CollectionItem = ({ item, addItem }) => {
  return (
    <CollectionItemContainer>
      <ItemImage imageUrl={item.imageUrl} />
      <CollectionFooter>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{item.price}</ItemPrice>
      </CollectionFooter>
      <CustomButton inverted isAddToCartStyled onClick={() => addItem(item)}>
        ADD TO CART
      </CustomButton>
    </CollectionItemContainer>
  );
};

CollectionItem.propTypes = {
  item: PropTypes.object,
  addItem: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
