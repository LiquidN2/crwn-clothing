import React from 'react';
import PropTypes from 'prop-types';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => {
  // only show the first 4 items
  const filteredItems = items.filter((item, index) => index < 4);

  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {filteredItems.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

CollectionPreview.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};

export default CollectionPreview;
