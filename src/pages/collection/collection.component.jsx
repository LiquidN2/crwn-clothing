import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionItem from 'components/collection-item/collection-item.component';

// REDUX SELECTORS
import { selectShopCollection } from 'redux/shop/shop.selectors';

// STYLES
import {
  CollectionPageContainer,
  Title,
  ItemsContainer,
} from './collection.styles';

const CollectionPage = ({ collection: { title, items } }) => {
  return (
    <CollectionPageContainer>
      <Title>{title}</Title>
      <ItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} collectionPage />
        ))}
      </ItemsContainer>
    </CollectionPageContainer>
  );
};

CollectionPage.propTypes = {
  collection: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { collectionRouteName } = ownProps.match.params;
  return {
    collection: selectShopCollection(collectionRouteName)(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);
