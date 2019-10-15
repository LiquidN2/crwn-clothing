import React from 'react';
import PropTypes from 'prop-types';
import './collection-item.styles.scss';

const CollectionItem = ({ id, name, price, imageUrl }) => {
  const itemBackgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <div className="collection-item">
      <div className="image" style={itemBackgroundStyle} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
    </div>
  );
};

CollectionItem.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default CollectionItem;
