import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import CollectionItem from 'components/collection-item/collection-item.component';

// REDUX SELECTORS
import { selectShopCollection } from 'redux/shop/shop.selectors';

// STYLES
import './collection.styles.scss';

const CollectionPage = ({ collection: { title, items } }) => {
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

CollectionPage.propTypes = {
  match: PropTypes.object,
  collection: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  const { collectionRouteName } = ownProps.match.params;
  return {
    collection: selectShopCollection(collectionRouteName)(state),
  };
};

export default connect(mapStateToProps)(CollectionPage);
